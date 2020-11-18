require("dotenv").config();
const express = require("express");
const router = express.Router();
const passport = require("passport");
const passportConfig = require("../../passport");
const JWT = require("jsonwebtoken");
const Image = require("../../models/Image");
const User = require("../../models/User");
// const { json } = require("body-parser");
var multer = require("multer");
const resData = require("../../functions/functions");

var storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
var imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter });

//Image hosting site Cloudinary
var cloudinary = require("cloudinary");
const { route } = require("./issues");
const Issue = require("../../models/Issue");
cloudinary.config({
  cloud_name: "dkn4000",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Login Code - All registrations require a code
const isAdminCode = process.env.ADMIN_CODE;
const isUserCode = process.env.USER_CODE;

//JWT Token
const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "TheDevCoder",
      sub: userID,
    },
    "TheDevCoder",
    { expiresIn: "1h" }
  );
};

//register route
router.post("/register", upload.single("image"), (req, res, next) => {
  //check if image file path present or not
  if (!req.file) {
    saveUser();
  } else {
    cloudinary.v2.uploader.upload(req.file.path, (err, result) => {
      if (err) {
        next("Image did not save to cloud!");
      }
      req.body.image = result.secure_url;
      req.body.imageId = result.public_id;

      Image.create(req.body, (err, image) => {
        if (err) {
          next("Image did not save to database!")
        }
        saveUser();
      });
    });
  }

  function saveUser() {
    //Needs to be destructed to use username inside findOne parameter {}
    const {
      username,
      password,
      registercode,
      jobtitle,
      imageId,
      image,
    } = req.body;

    User.findOne({ username }, (err, user) => {
      if (err) {
        next("Oops, something went wrong!");
      } else if (user) {
        next("Username is already taken.");
      } else {
        const newUser = new User({
          username,
          password,
          jobtitle,
          avatar: {
            imageId,
            image,
          },
        });
        //Test if Registration code user code or admin code
        if (registercode === isAdminCode) {
          //Set role as admin if register code matches Admin code
          newUser.role = "admin";
          saveToDB();
        } else if (registercode === isUserCode) {
          //Set as user if register code matches user code
          newUser.role = "user";
          saveToDB();
        } else {
          //Incorrect code
          next("Incorrect registration code.");
        }

        function saveToDB() {
          newUser
            .save()
            .then(() => resData.message("Account successfully created!", res))
            .catch(() => next("Oops, something went wrong!"));
        }
      }
    });
  }
});

//Get All Users
router.get("/user", (req, res, next) => {
  User.find()
    .sort({ createdAt: -1 })
    .then((findProfile) => res.status(200).json(findProfile))
    .catch(() => next("Oops, something went wrong!"));
});

//Show Route User
router.get("/user/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((findUser) => {
      res.status(200).json(findUser);
    })
    .catch(() => next("Person not found!"));
});

//Show Route Reported By -- Show all issues Reported by developer
router.get("/user/:id/reportedBy", (req, res, next) => {
  User.findById(req.params.id, (err, findUser) => {
    //In case Admin deletes User even though user is still linked to an issue.   Send warning message back.
    if (err || findUser === null) {
      next("Cannot find person.");
    } else {
      Issue.find()
        .where("reportedBy.id")
        .equals(findUser._id)
        .exec(function (err, findIssue) {
          if (err) {
            next("Oops, something went wrong!");
          } else {
            res.status(200).json(findIssue);
          }
        });
    }
  });
});

//Show Route Assigned to -- Show all Issues Assigned to Developer
router.get("/user/:id/assigned", (req, res, next) => {
  User.findById(req.params.id, (err, findUser) => {
    if (err || findUser === null) {
      next("Cannot find person.");
    } else {
      Issue.find()
        .where("assigned.id")
        .equals(findUser._id)
        .exec(function (err, findIssue) {
          if (err) {
            next("Oops, something went wrong!");
          } else {
            res.status(200).json(findIssue);
          }
        });
    }
  });
});

//Login Route
router.post(
  "/login",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    if (req.isAuthenticated) {
      const { _id, username, role, avatar, jobtitle } = req.user;
      const token = signToken(_id);
      res.cookie("access_token", token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username, role, avatar, jobtitle },
      });
    }
  }
);

//Logout Route
router.get(
  "/logout",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.clearCookie("access_token");
    res.status(200).json({
      user: {
        username: "",
        role: "",
        avatar: { image: "", imageId: "" },
        jobtitle: "",
      },
      success: true,
    });
  }
);

//Delete User
router.delete("/user/:id", (req, res, next) => {
  User.findById(req.params.id, async (err, user) => {
    if (err) {
      next("Oops, something went wrong!");
    } else {
      try {
        //Delete profile image from cloudinary & image collection
        if (user.avatar.imageId) {
          //Using await since removing image from cloudinary takes time.
          await cloudinary.v2.uploader.destroy(user.avatar.imageId);
          Image.findOneAndDelete(
            {
              imageId: user.avatar.imageId,
            },
            (err, deleteImage) => {
              if (err) {
                next("Oops, something went wrong!");
              }
            }
          );
        }
        //Remove user from collection
        user.remove().then(() => resData.message("User deleted", res));
      } catch (err) {
        next("Oops, something went wrong!");
      }
    }
  });
});

//Persistent Login -- Keeps user logged in despite refreshing page
router.get(
  "/authenticated",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { _id, username, role, avatar, jobtitle } = req.user;
    res.status(200).json({
      isAuthenticated: true,
      user: { _id, username, role, avatar, jobtitle },
    });
  }
);

module.exports = router;

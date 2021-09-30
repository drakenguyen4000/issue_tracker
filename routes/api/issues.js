//routes/api/items.js
require("dotenv").config();
const express = require("express");
const router = express.Router();
const Issue = require("../../models/Issue");
const Image = require("../../models/Image");
// const { json } = require("body-parser");
var multer = require("multer");
const resData = require("../../functions/functions");

//handles image files
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

//image hosting site
var cloudinary = require("cloudinary");
const { find } = require("../../models/Issue");
cloudinary.config({
  cloud_name: "dkn4000",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Index Route -- List
router.get("/", (req, res, next) => {
  //Find all documents in Issue collection
  Issue.find()
    .sort({ created: -1 })
    //Take list from database and respond in json format;
    .then((issuelist) => res.status(200).json(issuelist))
    .catch(() => next("Oops, something went wrong!"));
});

//Create Route -- Report Issue 
router.post("/", upload.single("image"), async (req, res, next) => {
  if (req.file) {
    try {
      //Does image id exist?  Remove existing image from cloudinary
      const result = await cloudinary.v2.uploader.upload(req.file.path);
      req.body.image = result.secure_url;
      // add image's public_id to image object
      req.body.imageId = result.public_id;
    } catch (err) {
      next("Oops, something went wrong!");
    }
  }

  //Create image and store inside Mongodb
  const newImage = new Image({
    imageId: req.body.imageId,
    image: req.body.image,
  });

  Image.create(newImage, (err, storeImage) => {
    if (err) {
      next("Image did not save!");
    }
    const newIssue = new Issue({
      project: req.body.project,
      title: req.body.title,
      reportedBy: {
        id: req.body.authorId,
        username: req.body.author,
      },
      assigned: {
        id: "000000000000000000000000",
        username: "n/a",
      },
      summary: req.body.summary,
      priority: req.body.priority,
      type: req.body.type,
      status: req.body.status,
      deadline: req.body.deadline,
    });
    //save new item to database
    //then respond back to axios with random message so axios to push history back to index route.
    newIssue
      .save()
      .then((recordIssue) => {
        recordIssue.image.push(storeImage);
        recordIssue.save();
        resData.message("Issue reported!", res);
      })
      .catch(() => next("Issue was not created!"));
  });
});

//Show Route 
router.get("/:id", (req, res, next) => {
  Issue.findById(req.params.id)
    .populate("image")
    .exec()
    .then((findIssue) => res.status(200).json(findIssue))
    .catch(() => next("Issue item not found."));
});

//Edit Issue Route 
router.get("/:id/edit", (req, res, next) => {
  Issue.findById(req.params.id)
    .then((findIssue) => res.status(200).json(findIssue))
    .catch(() => next("Oops, something went wrong!"));
});

//Update Issue Route 
router.put("/:id", upload.single("image"), (req, res, next) => {
  //Destroy existing image in cloudinary
  Issue.findById(req.params.id, async (err, findIssue) => {
    //Check if user submits image
    if (err) {
      next("Oops, something went wrong!");
    } else {
      //Does image path exist?
      if (req.file) {
        try {
          Image.findById(findIssue.image, async (err, findImage) => {
            //Does image id exist?  Remove existing image from cloudinary & database
            if (findImage.imageId) {
              cloudinary.v2.uploader.destroy(findImage.imageId);
            }
            //Upload new image into cloudinary
            const result = await cloudinary.v2.uploader.upload(req.file.path);
            //update body with new id and url
            req.body.imageId = result.public_id;
            req.body.image = result.secure_url;
            //Assign old image id to filter
            const filter = { _id: findImage._id };
            //Assign new image infos to update
            const update = { imageId: req.body.imageId, image: req.body.image };
            //Find by old image id and update Image Collection
            Image.findOneAndUpdate(filter, update)
              .then(() => console.log("Image updated!"))
              .catch((err) => console.log(err));
            saveIssue();
          });
        } catch (err) {
          next("Oops, something went wrong!");
        }
      } else {
        saveIssue();
      }
      function saveIssue() {
        //Assign all req items to their Issue properties
        findIssue.project = req.body.project;
        findIssue.title = req.body.title;
        findIssue.summary = req.body.summary;
        findIssue.priority = req.body.priority;
        findIssue.type = req.body.type;
        findIssue.status = req.body.status;
        findIssue.deadline = req.body.deadline;

        //Save all assignments to Issue Collection
        findIssue
          .save()
          .then(() => {
            resData.message("Issue edit successful!", res);
          })
          .catch(() => next("Oops, something went wrong!"));
      }
    }
  });
});

//Assign Developer - Update Route 
router.put("/:id/assign", (req, res, next) => {
  if(req.body.username === undefined ) {
    next("No developer assigned!");
  }
  const filter = { _id: req.params.id };
  const update = {
    assigned: { id: req.body.userId, username: req.body.username },
  };
  const newData = { new: true };

  //Update Issue with newly assigned user
  //populate issue's image to keep it displaying with refreshing page.
  Issue.findOneAndUpdate(filter, update, newData)
    .populate("image")
    .exec()
    .then((dev) => {
      resData.respond(dev, "Developer assigned!", res);
    })
    .catch(() => next("Cannot assign developer!"));
});

//Update Project Status - Update Route 
router.put("/:id/status", (req, res, next) => {
  if(req.body.status === undefined ) {
    next("No status selected!");
  } 
  const filter = { _id: req.params.id };
  const update = { status: req.body.status };
  const newData = { new: true };
  Issue.findOneAndUpdate(filter, update, newData)
    .populate("image")
    .exec()
    .then((status) => {
      resData.respond(status, "Status updated!", res);
    })
    .catch(() => next("Status update failed!"));
});   

//Delete Route 
router.delete("/:id", (req, res, next) => {
  Issue.findById(req.params.id, async (err, deleteIssue) => {
    if (err) {
      next("Oops, something went wrong!");
    } else {
      try {
        Image.findById(deleteIssue.image, async (err, deleteImage) => {
          // If imageId exist
          if (deleteImage.imageId) {
            //Remove that image from Cloudinary and database
            await cloudinary.v2.uploader.destroy(deleteImage.imageId);
            Image.findOneAndDelete({
              _id: deleteImage._id,
            }).catch((err) => console.log(err));
          }
          //Delete Issue
          deleteIssue
            .remove()
            .then(() => resData.message("Issue deleted!", res));

          //Delete all comments associated with this issue item
          Comment.deleteMany({ _id: { $in: deleteIssue.comments } })
            .then(() => console.log("Comments deleted!"))
            .catch((err) => console.log(err));
        });
      } catch (err) {
        next("Oops, something went wrong!");
      }
    }
  });
});

module.exports = router;

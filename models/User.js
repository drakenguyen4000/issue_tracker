const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    //username cannot be duplicate of existing username
    unique: true,
    //trims off white space in username
    trim: true,
    //username must be minimum of 3 characters
    minlength: 3,
  },
  avatar: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
    image: String,
    imageId: String,
  },
  jobtitle: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

//Hash Password
UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.hash(this.password, 10, (err, passwordHash) => {
    if (err) {
      return next(err);
    }
    this.password = passwordHash;
    next();
  });
});

//Check login against password in database
UserSchema.methods.comparePassword = function (password, cb) {
  //password = client password
  //this.password = hash password
  //callback function
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    } else if (!isMatch) {
      return cb(null, isMatch);
    } else {
      return cb(null, this);
    }
  });
};

module.exports = User = mongoose.model("User", UserSchema);

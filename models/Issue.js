//models/Issue.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = require("../functions/functions");

const IssueSchema = new Schema({
  project: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  reportedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  assigned: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    username: String,
  },
  image: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Image",
    },
  ],
  type: {
    type: String,
    required: true,
  },
  priority: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
  },
  created: {
    type: Date,
    default: date.getLocalTime()
  },
});

module.exports = Issue = mongoose.model("issue", IssueSchema);

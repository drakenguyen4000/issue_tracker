const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const date = require("../functions/functions");

const CommentSchema = new Schema({
    text: String,
    created: {
        type: Date,
        default: date.getLocalTime()
      },
    author: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
})

module.exports = Comment = mongoose.model("Comment", CommentSchema);
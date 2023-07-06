const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    text: String,
    created: {
        type: Date,
        default: Date.now
      },
    author: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
})

module.exports = Comment = mongoose.model("Comment", CommentSchema);
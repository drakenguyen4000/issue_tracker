const express = require("express");
const router = express.Router();
const Issue = require("../../models/Issue");
// const User = require("../../models/User");
const Comment = require("../../models/Comment");
const { json } = require("body-parser");
// const { response } = require("express");
const resData = require("../../functions/functions");
  
//Get Comments   
router.get("/:id/comments", (req, res, next) => {
  Issue.findById(req.params.id)
    .populate("comments")
    .exec()
    .then((issue) => {
      const allComments = [];
      //Take issue with comments associated an loops over each comment, grabbing the id so it can generate each author's info associated with that comment.
      issue.comments.map((comment) => {
        allComments.push(
          Comment.findById(comment._id)
            .populate("author")
            .exec()
        );
      });
      Promise.all(allComments)
        .then((data) => res.status(200).json(data))
        .catch(() => next("Cannot find comments!"));
    })
    .catch(() => next("Cannot find comments!"));
});

//Create Comment
router.post("/:id/comments", (req, res, next) => {
  Issue.findById(req.params.id, (err, findIssue) => {
    if (err) {
      next("Cannot post comment!");
    } else if (!req.body.comment) {
      next("Please fill out comment.");
    } else {
      const newComment = new Comment({
        text: req.body.comment,
        author: req.body.userId,
      });
      newComment
        .save()
        .then((comment) => {
          //Store new comment inside current issue document
          findIssue.comments.push(comment);
          findIssue.save();
          //Take newComment, populate author.  Send back to front end along with message
          Comment.populate(newComment, { path: "author" }, (err, postComment) => {
            resData.respond(postComment, "Comment submitted!", res);
          });
        })
        .catch(() => next("Cannot post comment!"));
    }
  });
});

//Edit Comment
router.get("/:id/comments/:comment_id/edit", (req, res, next) => {
  Comment.findById(req.params.comment_id)
    .then((findComment) => {
      //Convert Mongoose document to JSON object so we can store issueId
      //issueId is required for post route path /issues/:id/comments/:comments_id
      const comment = findComment.toObject();
      comment.issueId = req.params.id;
      res.status(200).json(comment);
    })
    .catch(() => next("Oops, something went wrong!"));
});

//Update Route
router.post("/:id/comments/:comment_id", (req, res, next) => {
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment)
    .then(() => resData.message("Comment updated!", res))
    .catch(() => next("Cannot update comment!"));
});

//Delete Comment
router.get("/:id/comments/:comment_id", (req, res, next) => {
  Comment.findByIdAndRemove(req.params.comment_id, (err, removedComment) => {
    if (err) {
      next("Cannot delete comment!");
    }
    const filter = { _id: req.params.id };
    const update = { $pull: { comments: req.params.comment_id } };
    Issue.findOneAndUpdate(filter, update)
      .then(() => resData.message("Comment deleted!", res))
      .catch(() => next("Oops, something went wrong!"));
  });
});

module.exports = router;

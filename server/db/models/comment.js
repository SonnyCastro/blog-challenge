const mongoose = require("mongoose"),
  Post = require("./post");

const commentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      default: "anonymous",
    },
    text: {
      type: String,
      required: true,
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;

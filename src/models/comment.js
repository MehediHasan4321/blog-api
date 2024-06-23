const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    body: String,
    authorId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    articleId: {
      type: Schema.ObjectId,
      ref: "Article",
    },
    status: {
      type: String,
      enum: ["public", "privet"],
      default: "public",
    },
  },
  { timestamps: true, id: true }
);

const Comment = model("Comment", CommentSchema);

module.exports = Comment;

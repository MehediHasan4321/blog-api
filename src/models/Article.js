const { Schema, model } = require("mongoose");

const ArticleSchema = new Schema(
  {
    title: String,
    body: String,
    cover: String,
    authorId: {
      type: Schema.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "draft",
    },
  },
  { timestamps: true, id: true }
);

const Article = model("Article", ArticleSchema);

module.exports = Article;

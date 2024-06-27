const { Article } = require("../../models");
const defaults = require("../../config/defaults");

const findAll = async ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = { title: { $regex: search, $options: "i" } };

  const article = await Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return article.map((article) => ({ ...article._doc }));
};

const count = ({ search = "" }) => {
  const filter = { title: { $regex: search, $options: "i" } };

  return Article.countDocuments(filter);
};

// Create an Article

const create = ({ title, body = "", cover = "", status = "draft", author }) => {
  if (!title || !author) {
    const error = new Error("Invalid parameters");
    error.status = 400;
    throw error;
  }

  const article = new Article({
    title,
    body,
    cover,
    status,
    author: author.id,
  });

  return article.save();
};

const findSingleItems = async ({ id, expend = "" }) => {
  if (!id) {
    throw new Error("Id is required");
  }

  expend = expend.split(",").map((item) => item.trim());

  const article = await Article.findById(id);

  if (expend.includes("author")) {
    await article.populate({ path: "author", select: "name"});
  }

  if (expend.includes("comment")) {
    await article.populate({
      path: "comments",
    });
  }

  return article._doc;
};

module.exports = {
  findAll,
  create,
  count,
  findSingleItems,
};

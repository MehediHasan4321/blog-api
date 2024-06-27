const { Article } = require("../../models");
const defaults = require('../../config/defaults')
const findAll =  ({
  page = defaults.page,
  limit = defaults.limit,
  sortType = defaults.sortType,
  sortBy = defaults.sortBy,
  search = defaults.search,
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  const filter = { title: { $regex: search, $options: "i" } };

  return Article.find(filter)
    .populate({ path: "author", select: "name" })
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);
};

const count = ({ search = "" }) => {
  const filter = { title: { $regex: search, $options: "i" } };

  return Article.countDocuments(filter);
};

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

module.exports = {
  findAll,
  create,
  count,
};

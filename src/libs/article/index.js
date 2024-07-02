const { Article } = require("../../models");
const defaults = require("../../config/defaults");
const { notFound } = require("../../utils/error");

/**
 * findAll Items
 * Count all items
 * Find a single Items
 * Create a new item
 * Create or update on Item
 * @param {*} param0
 * @returns  {}
 */

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
    author: author._id,
  });

  return article.save();
};

const findSingleItems = async ({ id, expend = "" }) => {
  if (!id) {
    throw new Error("Id is required");
  }

  expend = expend.split(",").map((item) => item.trim());

  const article = await Article.findById(id);

  if (!article) {
    throw notFound();
  }

  if (expend.includes("author")) {
    await article.populate({ path: "author", select: "name" });
  }

  if (expend.includes("comment")) {
    await article.populate({
      path: "comments",
    });
  }

  return article._doc;
};

const updateOrCreate = async (
  id,
  { title, body, cover = "", status = "draft", author }
) => {
  const article = await Article.findById(id);
  if (!article) {
    const article = await create({ title, body, status, cover, author });

    return {
      article: article._doc,
      status: 201,
    };
  }

  const payload = {
    title,
    body,
    cover,
    status,
    author: author.id,
  };

  article.overwrite(payload);

  await article.save();
  return {
    article: article._doc,
    status: 200,
  };
};

const updateProperties = async (id, { title, body, cover, status }) => {
  const article = await Article.findById(id);

  if (!article) {
    throw notFound();
  }

  const payload = { title, body, cover, status };

  Object.keys(payload).forEach((key) => {
    article[key] = payload[key] ?? article[key];
  });

  await article.save();

  return article._doc;
};

const remove = async (id) => {
  const article = await Article.findById(id);

  if (!article) {
    throw notFound();
  }

  //TODO: asynchronously delete all associted comment

  return Article.findByIdAndDelete(id);
};

const checkOwnership = async ({ resourceId, userId }) => {
  const article = await Article.findById(resourceId);

  if (!article) {
     throw notFound();
  }

  if (article._doc.author._id.toString() === userId) return true;

  return false;
};

module.exports = {
  findAll,
  create,
  count,
  findSingleItems,
  updateOrCreate,
  updateProperties,
  remove,
  checkOwnership,
};

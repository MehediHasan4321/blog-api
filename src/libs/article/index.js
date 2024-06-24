const { Article } = require("../../models");

const findAll = async ({
  page = 1,
  limit = 10,
  sortType = "dsc",
  sortBy = "updatedAt",
  search = "",
}) => {
  const sortStr = `${sortType === "dsc" ? "-" : ""}${sortBy}`;
  
  const articles = await Article.find({
    title: { $regex: search, $options: "i" },
  })
    .populate({path:'author',select:'name'})
    .sort(sortStr)
    .skip(page * limit - limit)
    .limit(limit);

  return articles;
};

const create = ({ title, body = "", cover = "", status = "draft", author }) => {
  if (!title || !author) {
    const error = new Error('Invalid parameters')
    error.status = 400
    throw error
  }

  const article =  new Article({title,body,cover,status,author:author.id})

  return article.save()


};

module.exports = {
  findAll,
  create,
};

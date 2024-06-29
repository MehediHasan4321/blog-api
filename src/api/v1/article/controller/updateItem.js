const articleService = require("../../../../libs/article");

const updateItem = async (req, res, next) => {
  const id = req.params.id;
  const cover = req.body.cover || "";
  const status = req.body.status || "draft";

  try {
    const {article,status:articleStatus} = await articleService.updateOrCreate(id, {
      title: req.body.title,
      body: req.body.body,
      author: req.user,
      cover,
      status,
    });


    const response = {
        code: articleStatus,
        message: articleStatus === 200? "Article Updated Successfully":"Article Created Successfully",
        data: article,
        links: {
          self: `/articles/${article._id}`,
        },
      }

    res.status(articleStatus).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItem;

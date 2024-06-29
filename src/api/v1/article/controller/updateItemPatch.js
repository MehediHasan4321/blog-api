const articleService = require("../../../../libs/article");

const updateItemPatch = async (req, res, next) => {
  const id = req.params.id;
 

  try {
    const article = await articleService.updateProperties(id,req.body);


    const response = {
        code: 200,
        message: 'Article Updated Successfully',
        data: article,
        links: {
          self: `/articles/${article._id}`,
        },
      }

    res.status(200).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = updateItemPatch;

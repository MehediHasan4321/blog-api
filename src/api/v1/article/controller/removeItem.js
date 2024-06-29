const articleService = require("../../../../libs/article");

const removeItem= async (req, res, next) => {
  const id = req.params.id;
 

  try {
     await articleService.remove(id);


   

    res.status(204).end()
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;

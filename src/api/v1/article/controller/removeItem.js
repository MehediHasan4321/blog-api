const articleService = require("../../../../libs/article");

const removeItem= async (req, res, next) => {
  const id = req.params.id;
 

  try {
     await articleService.remove(id);


   

    res.status(204).json({mes:'Article Deleted Successfully'})
  } catch (e) {
    next(e);
  }
};

module.exports = removeItem;

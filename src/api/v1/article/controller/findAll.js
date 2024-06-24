const articleServices = require('../../../../libs/article')


const findAll =async (req,res,next)=>{
    const page = req.query.page || 1 
    const limit = req.query.limit || 10
    const sortType = req.query.sort_type || 'dsc';
    const sortBy = req.query.sort_by || 'updatedAt'
    const search = req.query.search || ''


    try {
        const articles = await articleServices
        .findAll({page,limit,sortType,sortBy,search})
        

        res.status(200).json({data:articles})
        
    } catch (e) {
        next(e)
    }


    
}

module.exports=findAll
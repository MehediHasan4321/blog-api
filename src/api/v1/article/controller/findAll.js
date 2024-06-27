const articleServices = require('../../../../libs/article')
const {query} = require('../../../../utils')
const defaults = require('../../../../config/defaults')



const findAll =async (req,res,next)=>{
    const page = req.query.page || defaults.page
    const limit = req.query.limit || defaults.limit
    const sortType = req.query.sort_type || defaults.sortType
    const sortBy = req.query.sort_by || defaults.sortBy
    const search = req.query.search || defaults.search


    try {
        const articles = await  articleServices
        .findAll({page,limit,sortType,sortBy,search})
        

        // Results

        const data = query.getTransformedItems({items:articles,selection:['title','author','status','cover'],path:'/articles'})


        // Paginations 

        const totalItems = await articleServices.count({search})
        const pagination= query.getPegination ({totalItems,page,limit})

        
        // Links
        const links = query.getHATEOASForAll({
            url:req.url,
            path:req.path,
            queryStr:req.query,
            hasNext:!!pagination.next,
            hasPrev:!!pagination.prev,
            page,
        })
        

        res.status(200).json({data,pagination,links})
        
    } catch (e) {
        next(e)
    }


    
}

module.exports=findAll
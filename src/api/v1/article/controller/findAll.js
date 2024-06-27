const articleServices = require('../../../../libs/article')
const {generateQueryString,getPegination} = require('../../../../utils')
const defaults = require('../../../../config/defaults')



const findAll =async (req,res,next)=>{
    const page = req.query.page || defaults.page
    const limit = req.query.limit || defaults.limit
    const sortType = req.query.sort_type || defaults.sortType
    const sortBy = req.query.sort_by || defaults.sortBy
    const search = req.query.search || defaults.search


    try {
        const articles = await articleServices
        .findAll({page,limit,sortType,sortBy,search})
        

        // Results

        const data = articles.map(aritcle=>({
            ...aritcle._doc,
            link:`/articles/${aritcle.id}`
        }))


        // Paginations 

        const totalItems = await articleServices.count({search})
        const pagination= getPegination({totalItems,page,limit})

        
        // Links

        const links = {
            self:req.url,
        }

        if(pagination.next){
            const query = generateQueryString({...req.query,page:page+1})
            links.next = `${req.path}?${query}`
        }

        if(pagination.prev){
            const query= generateQueryString({...req.query, page: page-1})

            links.prev = `${req.path}?${query}`
        }

        res.status(200).json({data,pagination,links})
        
    } catch (e) {
        next(e)
    }


    
}

module.exports=findAll
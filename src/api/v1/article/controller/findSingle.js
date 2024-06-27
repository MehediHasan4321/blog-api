const articleServices = require('../../../../libs/article')

const findSingle = async(req,res,next)=>{

 

    const id = req.params.id
    const expend = req.query.expend || ''
    
    
    try {
        const article = await articleServices.findSingleItems({id,expend})



        const response = {
            data:article,
            links:{
                self:`/articles/${article._id}`,
                author:`/articles/${article._id}/author`,
                comments:`/articles/${article._id}/comments`
            }
        }

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}


module.exports=findSingle
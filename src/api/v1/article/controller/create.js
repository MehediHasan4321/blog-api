const articleServices = require('../../../../libs/article')

const create =async (req,res,next)=>{
    
    const {title,body,cover,status} = req.body

    const article = await  articleServices.create({
        title,
        body,
        cover,
        status,
        author:req.user
    })

    const response = {
        code:201,
        message:'Article Created Successfully',
        data:{...article._doc},
        links:{
            self:`/articles/${article._id}`,
            author:`/articles/${article._id}/author`,
            comments:`/articles/${article._id}/comments`
        }
    }

    res.status(201).json(response)

    try {
        
    } catch (e) {
        next(e)
    }

}

module.exports = create
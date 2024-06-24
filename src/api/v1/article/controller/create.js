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

    res.status(201).json(article)

    try {
        
    } catch (e) {
        next(e)
    }

}

module.exports = create
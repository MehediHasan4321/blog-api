const articleService = require('../libs/article')
const { authorizationError } = require('../utils/error')

const ownership = (model='')=>async(req,_res,next) =>{
  
    if(model==='Article'){
        const isOwner =  await articleService.checkOwnership({resourceId:req.params.id,userId:req.user._id})
        
        if(isOwner){
            return next()
        }

        return next(authorizationError())

    }
}


module.exports=ownership
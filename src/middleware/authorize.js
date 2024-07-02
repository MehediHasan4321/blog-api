const {authorizationError} = require('../utils/error')

const authorize = (rolese=['admin'])=>(req,_res,next)=>{
    if(rolese.includes(req.user.role)){
        return next()
    }

    return next(authorizationError())
}


module.exports=authorize
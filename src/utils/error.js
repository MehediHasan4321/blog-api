const notFound = (mgs='Resourse Not found')=>{
    const error = new Error(mgs)
    error.status=404
    return error
}

const badRequest = (mgs='Bad Request')=>{
    const error = new Error(mgs)
    error.status = 400
    return error
}

const serverError = (mgs='Internal Server Error')=>{
    const error = new Error(mgs)
    error.status=500

    return error
}


module.exports={
    notFound,
    badRequest,
    serverError,
}



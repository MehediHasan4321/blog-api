const notFound = (mgs='Resourse Not found')=>{
    const error = new Error(mgs)
    error.status=404
    return error
}

module.exports={notFound}

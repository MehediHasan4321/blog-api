const defaults = require('../config/defaults')


/**
 * this function will return a pagination base on total items and page and limit
 * @param {totalItems} param0 
 * @returns {}
 */

const getPegination = ({
    totalItems=defaults.totalItems,
    page = defaults.page,
    limit= defaults.limit
})=>{
    const totalPage = Math.ceil(totalItems/limit)
        const pagination={
            totalItems,
            page,
            limit,
            totalPage,
            
        }

        

        if(page<totalPage){
            pagination.next = page + 1
        
        }

        if(page> 1){
            pagination.prev = page -1
        }


        return pagination
}


module.exports = {getPegination}
const defaults = require("../config/defaults");
const {generateQueryString} = require('./qs')
/**
 * this function will return a pagination base on total items and page and limit
 * @param {totalItems} param0
 * @returns {}
 */

const getPegination = ({
  totalItems = defaults.totalItems,
  page = defaults.page,
  limit = defaults.limit,
}) => {
  const totalPage = Math.ceil(totalItems / limit);
  const pagination = {
    totalItems,
    page,
    limit,
    totalPage,
  };

  if (page < totalPage) {
    pagination.next = page + 1;
  }

  if (page > 1) {
    pagination.prev = page - 1;
  }

  return pagination;
};


const getHATEOASForAll = ({url='/',path='',queryStr={},hasNext=false,hasPrev=false,page=1})=>{
    const links = {
        self:url,
    }

    if(hasNext){
        const query = generateQueryString({...queryStr,page:page+1})
        links.next = `${path}?${query}`
    }

    if(hasPrev){
        const query= generateQueryString({...queryStr, page: page-1})

        links.prev = `${path}?${query}`
    }

    return links
}


const getTransformedItems = ({items =[],selection=[],path='/'})=>{

    if(!Array.isArray(items) || !Array.isArray(selection)){
        throw new Error('Invalid Arguments')
    }

   

    if(selection.length === 0){
        return items.map(item=>({...item,link:`${path}/${item._id}`}))
    }

    return items.map(item=>{
        const result = {}

        selection.forEach(key=>{
            result[key] = item[key]
        })
        result.link= `${path}/${item._id}`

       return result 
    })

}


module.exports = { 
    getPegination ,
    getHATEOASForAll,
    getTransformedItems
};

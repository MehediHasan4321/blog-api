const {controllers : articleControllers} = require('../api/v1/article/')

const router = require('express').Router()


router.route('/api/v1/articles')
.get(articleControllers.findAll)
.post(articleControllers.create)

router.route('/api/v1/articles/:id')
.put(()=>{})
.patch(()=>{})
.delete(()=>{})



module.exports = router
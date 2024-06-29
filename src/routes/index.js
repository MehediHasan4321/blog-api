const {controllers : articleControllers} = require('../api/v1/article/')

const router = require('express').Router()


router.route('/api/v1/articles')
.get(articleControllers.findAll)
.post(articleControllers.create)

router.route('/api/v1/articles/:id')
.get(articleControllers.findSingle)
.put(articleControllers.updateItem)
.patch(articleControllers.updateItemPatch)
.delete(articleControllers.removeItem)



module.exports = router
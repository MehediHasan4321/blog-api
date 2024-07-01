const router = require('express').Router()
const {controllers : articleControllers} = require('../api/v1/article/')
const {controllers:authControllers} = require('../api/v1/auth')



// Auth Routers

router.route('/api/v1/auth/login').post(authControllers.login)
router.route('/api/v1/auth/regeister').post(authControllers.regeister)




// Article Routers

router.route('/api/v1/articles')
.get(articleControllers.findAll)
.post(articleControllers.create)

router.route('/api/v1/articles/:id')
.get(articleControllers.findSingle)
.put(articleControllers.updateItem)
.patch(articleControllers.updateItemPatch)
.delete(articleControllers.removeItem)



module.exports = router
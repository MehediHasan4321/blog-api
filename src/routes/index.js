const router = require('express').Router()
const {controllers : articleControllers} = require('../api/v1/article/')
const {controllers:authControllers} = require('../api/v1/auth')
const authenticate = require('../middleware/authenticate')
const authorize = require('../middleware/authorize')
const ownership = require('../middleware/ownership')
// Auth Routers

router.route('/api/v1/auth/login').post(authControllers.login)
router.route('/api/v1/auth/regeister').post(authControllers.regeister)




// Article Routers

router.route('/api/v1/articles')
.get(articleControllers.findAll)
.post( authenticate,articleControllers.create)

router.route('/api/v1/articles/:id')
.get(articleControllers.findSingle)
.put(authenticate,authorize(['user','admin']),articleControllers.updateItem)
.patch(authenticate,authorize(['user','admin']),articleControllers.updateItemPatch)
.delete(authenticate,authorize(['admin','user']),ownership('Article'),articleControllers.removeItem)



module.exports = router
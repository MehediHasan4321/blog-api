const tokenServices = require('../libs/token');
const {authenticationError} = require('../utils/error')
const userService = require('../libs/user')


const authenticate = async(req, _res, next) => {
  
  const token = req.headers.authorization.split(' ')[1]

  try {
    const decoded = tokenServices.verifyToken({token})

    const user = await userService.findUserByEmail(decoded.email)

    if(!user){
      next(authenticationError())
    }

    if(user.status !== 'approved'){
      next(authenticationError(`Your account is ${user.status}`))
    }


    req.user = decoded

    next()
  } catch (e) {
    next(authenticationError())
  }
  
};

module.exports = authenticate

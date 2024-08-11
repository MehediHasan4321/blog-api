const authService = require('../../../../libs/auth')
const {generateToken} = require('../../../../libs/token')
const regeister = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    
    const user = await authService.register({name,email,password})


    // generate access token

  const payload = {
    _id:user._id,
    name:user.name,
    email:user.email,
    role:user.role,
    status:user.status,
  }

  const accessToken = generateToken({payload})

// Generate response

  const response = {
    code:201,
    message:'Register successfully',
    data:{
      access_token:accessToken
    },
    links:{
      self:req.url,
      login:'/auth/login'
    }

  }


    res.status(201).json(response);
  } catch (e) {
    next(e);
  }
};

module.exports = regeister;

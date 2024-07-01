const { userExist,createUser } = require("../user");
const { badRequest } = require("../../utils/error");
const {generateHash} = require('../../utils/hashing')


const register = async ({ name, email, password }) => {
  const hasUser =await userExist(email);
  
  if (hasUser) {
    throw badRequest("User already exist!");
  }

  password = await generateHash(password)

  const user = await createUser({name,email,password})

  return user

};

module.exports = {
  register,
};

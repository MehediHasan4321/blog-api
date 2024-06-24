const authenticate = (req, _res, next) => {
  req.user = {
    id: '6678d01f23c62f5c33524b6a',
    name: "Mehedi Hasan",
    email:'mehedi@gmail.com',
    role:'user'
  };
  next();
};

module.exports = authenticate;

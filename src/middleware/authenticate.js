const authenticate = (req, _res, next) => {
  req.user = {
    id: 999,
    name: "Mehedi Hasan",
  };
  next();
};

module.exports = authenticate;

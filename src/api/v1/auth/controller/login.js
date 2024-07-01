const login = (req, res, next) => {
    const {email,password} = req.body
  try {
    res.status(200).json({ mes: "login" });
  } catch (e) {
    next(e);
  }
};

module.exports = login;

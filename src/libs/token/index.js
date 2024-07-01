const jwt = require("jsonwebtoken");
const { serverError } = require("../../utils/error");

const generateToken = ({
  payload,
  algorithm = "HS256",
  secrect = process.env.ACCESS_TOKEN_SECRECT,
}) => {
  try {
    return jwt.sign(payload, secrect, { algorithm });
  } catch (e) {
    console.log('[JWT',e);
    throw serverError();
  }
};

const decodeToken = ({ token, algorithm }) => {
  try {
    return jwt.decode(token, algorithm);
  } catch (e) {
    console.log('[JWT',e);
    throw serverError();
  }
};

const verifyToken = ({
  token,
  algorithm = "HS256",
  secrect = process.env.ACCESS_TOKEN_SECRECT,
}) => {
  try {
    return jwt.verify(token, secrect, { algorithms: [algorithm] });
  } catch (e) {
    console.log('[JWT',e);
    throw serverError();
  }
};

module.exports = {
  generateToken,
  decodeToken,
  verifyToken,
};

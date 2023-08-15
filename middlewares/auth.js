const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/constants');

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    res.status(401).send({ message: 'Oshibka tokena' });
  }
  req.user = payload;
  next();
};

module.exports = auth;

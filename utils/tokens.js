const JWT = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');

function generateToken(payload) {
  return JWT.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

function checkToken(token) {
  if (!token) {
    return false;
  }
  try {
    return JWT.verify(token, JWT_SECRET);
  } catch {
    return false;
  }
}

module.exports = { generateToken, checkToken };

const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  const token = req.header('x-auth-token');

  // Check Token
  if (!token) {
    return res.status(401).json({ msg: 'No token,authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, config.get('jwtsecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.error(err.message);
    return res.status(401).json({ msg: 'Invalid token,Access denied' });
  }
};

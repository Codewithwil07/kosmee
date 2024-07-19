const jwt = require('jsonwebtoken');
const User = require('../models/User');

const autentikasi = async (req, res, next) => {
  let token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (error) {
      res.status(401).send('tidak ter autorisasi, token salah');
      throw new Error('tidak ter-autorisasi, token salah');
    }
  } else {
    throw new Error('tidak ter-autorisasi, token tidak ada');
  }
};

const jalurAdmin = async (req, res, next) => {
  req.user && req.user.isAdmin === true
    ? next()
    : res.status(401).send('tidak ter-autorisasi sebagai admin');
};
module.exports = { autentikasi, jalurAdmin };

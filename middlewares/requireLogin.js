const defines = require('../defines');

module.exports = function (req, res, next) {
  if(req.session.isLoggedIn !== true) return res.status(403).json(defines.notLoggedIn);
  next();
};

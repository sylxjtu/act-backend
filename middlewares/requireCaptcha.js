const defines = require('../defines');

module.exports = function (req, res, next) {
  if(!req.session.captcha || req.session.captcha.toUpperCase() !== req.body.captcha.toUpperCase()) {
    req.session.captcha = null;
    return res.json(defines.captchaIncorrect);
  }
  req.session.captcha = null;
  next();
};

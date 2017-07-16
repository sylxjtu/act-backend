const defines = require('../defines');

module.exports = function (req, res, next) {
  if(req.session.captcha === undefined || req.session.captcha !== req.body.captcha) return res.json(defines.captchaIncorrect);
  next();
};

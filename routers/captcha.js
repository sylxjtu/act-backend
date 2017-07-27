const ccap = require('ccap')();
const express = require('express');

module.exports = function() {
  const router = express.Router();
  router.get('/', function(req, res) {
    var captcha = ccap.get();
    res.header({'Cache-Control': 'no-cache'});
    req.session.captcha = captcha[0];
    res.end(captcha[1]);
  });
  return router;
};

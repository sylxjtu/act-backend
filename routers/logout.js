const express = require('express');
const defines = require('../defines');
const requireLogin = require('../middlewares/requireLogin');

module.exports = function() {
  const router = express.Router();
  // Logout
  router.post('/', requireLogin, function(req, res) {
    req.session.isLoggedIn = false;
    res.json(defines.success);
  });
  return router;
};

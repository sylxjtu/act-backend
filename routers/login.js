const express = require('express');
const defines = require('../defines');
const requireCaptcha = require('../middlewares/requireCaptcha');
const MetadataModel = require('../models/metadata');

module.exports = function(context) {
  const router = express.Router();
  const metadataModel = MetadataModel(context);

  // Login
  router.post('/', requireCaptcha, function(req, res) {
    if(req.session.isLoggedIn === true) return res.json(defines.alreadyLoggedIn);
    metadataModel.login(req.body.data.password).then(() => {
      req.session.isLoggedIn = true;
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });

  // View Login Status
  router.get('/', function(req, res) {
    if(req.session.isLoggedIn === true) return res.json(defines.alreadyLoggedIn);
    else return res.json(defines.notLoggedIn);
  });
  return router;
};

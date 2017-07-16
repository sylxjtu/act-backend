const express = require('express');
const defines = require('../defines');
const requireLogin = require('../middlewares/requireLogin');
const MetadataModel = require('../models/metadata');

module.exports = function(context) {
  const router = express.Router();
  const metadataModel = MetadataModel(context);

  // Metadata
  router.post('/', requireLogin, function(req, res) {
    metadataModel.updateMetadata(req.body.data).then(() => {
      req.session.isLoggedIn = true;
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });
  return router;
};

const express = require('express');
const requireLogin = require('../middlewares/requireLogin');
const sendData = require('../middlewares/sendData');
const MetadataModel = require('../models/metadata');

module.exports = function(context) {
  const router = express.Router();
  const metadataModel = MetadataModel(context);

  // Update Metadata
  router.post('/', requireLogin, sendData(
    (req) => metadataModel.updateMetadata(req.body.data)
  ));

  // Get Metadata
  router.get('/', requireLogin, sendData(
    () => metadataModel.getMetadata(),
    (result) => ({data: result})
  ));

  return router;
};

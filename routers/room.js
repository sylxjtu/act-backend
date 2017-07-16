const express = require('express');
const defines = require('../defines');
const requireLogin = require('../middlewares/requireLogin');
const RoomModel = require('../models/room');

module.exports = function(context) {
  const router = express.Router();
  const roomModel = RoomModel(context);

  // Get all room
  router.get('/', function(req, res) {
    roomModel.getRooms().then((results) => {
      res.json(Object.assign({}, defines.success, {data: results}));
    }).catch((error) => {
      res.json(error);
    });
  });

  // Create an activity
  router.put('/', requireLogin, function(req, res) {
    roomModel.createRoom(req.body.data).then(() => {
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });
  return router;
};

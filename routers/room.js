const express = require('express');
const requireLogin = require('../middlewares/requireLogin');
const sendData = require('../middlewares/sendData');
const RoomModel = require('../models/room');

module.exports = function(context) {
  const router = express.Router();
  const roomModel = RoomModel(context);

  // Get all room
  router.get('/', sendData(
    () => roomModel.getRooms(),
    (results) => ({data: results})
  ));

  // Create a room
  router.put('/', requireLogin, sendData(
    (req) => roomModel.createRoom(req.body.data)
  ));

  return router;
};

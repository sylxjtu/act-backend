const express = require('express');
const defines = require('../defines');
const requireLogin = require('../middlewares/requireLogin');
const requireCaptcha = require('../middlewares/requireCaptcha');
const ActivityModel = require('../models/activity');

module.exports = function(context) {
  const router = express.Router();
  const activityModel = ActivityModel(context);

  // Get all activity
  router.get('/', function(req, res) {
    activityModel.getActivities().then((results) => {
      res.json(Object.assign({}, defines.success, {data: results}));
    }).catch((error) => {
      res.json(error);
    });
  });

  // Create an activity
  router.put('/', requireCaptcha, function(req, res) {
    activityModel.createActivity(req.body.data).then(() => {
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });

  // View an activity
  router.get('/:activityId', requireLogin, function(req, res) {
    activityModel.getActivityInfo(req.params.activityId).then((results) => {
      res.json(Object.assign({}, defines.success, {data: results}));
    }).catch((error) => {
      res.json(error);
    });
  });

  // Accept an activity
  router.post('/:activityId', requireLogin, function(req, res) {
    activityModel.acceptActivity(req.params.activityId).then(() => {
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });

  // Delete an activity
  router.delete('/:activityId', requireLogin, function(req, res) {
    activityModel.deleteActivity(req.params.activityId).then(() => {
      res.json(defines.success);
    }).catch((error) => {
      res.json(error);
    });
  });
  return router;
};

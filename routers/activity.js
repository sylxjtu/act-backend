const express = require('express');
const requireLogin = require('../middlewares/requireLogin');
const requireCaptcha = require('../middlewares/requireCaptcha');
const sendData = require('../middlewares/sendData');
const ActivityModel = require('../models/activity');

module.exports = function(context) {
  const router = express.Router();
  const activityModel = ActivityModel(context);

  // Get all activity
  router.get('/', sendData(
    (req) => activityModel.getActivities(req.query.showAllActivities),
    (results) => ({data: results})
  ));

  // Create an activity
  router.put('/', requireCaptcha, sendData(
    (req) => activityModel.createActivity(req.body.data)
  ));

  // View an activity
  router.get('/:activityId', requireLogin, sendData(
    (req) => activityModel.getActivityInfo(req.params.activityId),
    (results) => ({data: results})
  ));

  // Accept an activity
  router.post('/:activityId', requireLogin, sendData(
    (req) => activityModel.acceptActivity(req.params.activityId)
  ));

  // Delete an activity
  router.delete('/:activityId', requireLogin, sendData(
    (req) => activityModel.deleteActivity(req.params.activityId)
  ));

  return router;
};

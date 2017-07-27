const defines = require('../defines');

module.exports = function(context) {
  return {
    getActivities(showAllActivities) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          `SELECT activity.id AS id, activity.name AS name, roomId, room.name AS roomName, beginTime, endTime, isAccepted FROM activity, room
          WHERE (endTime > NOW() OR ?) AND roomId = room.id`,
          [showAllActivities === 'true' ? 1 : 0],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results, fields);
          });
      });
    },
    createActivity(newActivity) {
      return new Promise((resolve, reject) => {
        // TODO: Add schema validation
        context.pool.query(
          'INSERT INTO activity (name, roomId, beginTime, endTime, studentId, studentName, studentPhone, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [newActivity.name, newActivity.roomId, newActivity.beginTime, newActivity.endTime, newActivity.studentId, newActivity.studentName, newActivity.studentPhone, newActivity.email],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results, fields);
          }
        );
      });
    },
    getActivityInfo(activityId) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          `SELECT activity.id AS id, activity.name AS name, room.name AS roomName, beginTime, endTime, isAccepted, studentId, studentName, studentPhone, createTime, email
          FROM activity, room
          WHERE activity.id = ? AND room.id = roomId`,
          [activityId],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else if(!results[0]) reject(defines.resourceNotFound);
            else resolve(results[0], fields);
          }
        );
      });
    },
    acceptActivity(activityId) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'SELECT isAccepted FROM activity WHERE id = ?',
          [activityId],
          function(error, results) {
            if(error) reject(defines.internalError(error.code));
            else if(!results[0]) reject(defines.resourceNotFound);
            else if(results[0].isAccepted !== 0) reject(defines.alreadyAccepted);
            else context.pool.query(
              `SELECT conflict.id FROM activity AS origin, activity AS conflict
              WHERE origin.id = ? AND conflict.id <> origin.id AND conflict.roomId = origin.roomId AND conflict.isAccepted = 1
              AND conflict.beginTime < origin.endTime AND conflict.endTime > origin.beginTime`,
              [activityId],
              function(error, results) {
                if(error) reject(defines.internalError(error.code));
                else if(results.length > 0) reject(defines.conflictingActivity(results));
                else context.pool.query(
                  'UPDATE activity SET isAccepted = 1 WHERE id = ?',
                  [activityId],
                  function(error, results, fields) {
                    if(error) reject(defines.internalError(error.code));
                    else resolve(results, fields);
                  }
                );
              }
            );
          }
        );
      });
    },
    deleteActivity(activityId) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'DELETE FROM activity WHERE id = ?',
          [activityId],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results, fields);
          }
        );
      });
    }
  };
};

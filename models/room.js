const defines = require('../defines');

module.exports = function(context) {
  return {
    createRoom(roomData) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'INSERT INTO room (name) VALUES (?)',
          [roomData.name],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results, fields);
          }
        );
      });
    },
    getRooms() {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'SELECT id, name FROM room',
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results, fields);
          }
        );
      });
    }
  };
};

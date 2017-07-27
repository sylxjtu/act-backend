const defines = require('../defines');

module.exports = function(context) {
  return {
    login(password) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'SELECT password FROM metadata',
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else if(results[0].password !== password) reject(defines.incorrectPassword);
            else resolve(results, fields);
          }
        );
      });
    },
    updateMetadata(newData) {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'UPDATE metadata SET password=?, email=? WHERE password = ?',
          [newData.newPassword, newData.email, newData.oldPassword],
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            if(results.affectedRows == 0) reject(defines.incorrectPassword);
            else resolve(results, fields);
          }
        );
      });
    },
    getMetadata() {
      return new Promise((resolve, reject) => {
        context.pool.query(
          'SELECT email FROM metadata',
          function(error, results, fields) {
            if(error) reject(defines.internalError(error.code));
            else resolve(results[0], fields);
          }
        );
      });
    }
  };
};

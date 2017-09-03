const defines = require('../defines');
const encrypt = require('./encrypt');
const settings = require('../settings');

function createUser (context) {
  return new Promise((resolve, reject) => {
    context.pool.query(
      'INSERT INTO metadata (password, email) VALUES (?, ?)',
      [encrypt(settings.initialPassword), 'example@example.com'],
      function(error) {
        if(error) reject(defines.internalError(error.code));
        else resolve();
      }
    );
  });
}

module.exports = function initDatabase (context) {
  return new Promise((resolve, reject) => {
    context.pool.query(
      'SELECT password FROM metadata',
      function(error, results) {
        if(error) reject(defines.internalError(error.code));
        else if(results.length === 0) createUser().then(resolve());
        else resolve();
      }
    );
  });
};

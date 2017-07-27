const defines = require('../defines');

module.exports = function (extractPromise, extractData) {
  extractData = (typeof extractData === 'function') ? extractData : () => ({});
  return function (req, res, next) {
    extractPromise(req).then((results) => {
      res.json(Object.assign({}, defines.success, extractData(results)));
      next();
    }).catch((error) => {
      res.json(error);
    });
  };
};

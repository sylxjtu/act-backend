const productionSettings = require('productionSettings');
const devSettings = require('devSettings');
module.exports = (process.env.NODE_ENV === 'production' ? productionSettings : devSettings);

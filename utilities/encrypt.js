const md5 = require('md5');
const settings = require('../settings');
module.exports = (password) => md5(password + settings.salt);

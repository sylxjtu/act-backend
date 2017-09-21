const defines = {
  internalError: (msg) => ({code: -1, msg: `Internal Error: ${msg}`}),
  success: {code: 0, msg: 'Success'},
  alreadyLoggedIn: {code: 1, msg: 'Already Logged In'},
  incorrectPassword: {code: 2, msg: 'Incorrect Password'},
  notLoggedIn: {code: 3, msg: 'Not Logged In'},
  resourceNotFound: {code: 4, msg: 'Resource Not Found'},
  alreadyAccepted: {code: 5, msg: 'Already Accepted'},
  conflictingActivity: (meta) => ({code: 6, msg: 'Conflicting Activity', meta}),
  captchaIncorrect: {code: 7, msg: 'Captcha Incorrect'},
  roomDeleted: {code: 8, msg: 'Room Deleted'}
};
module.exports = defines;

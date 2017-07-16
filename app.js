const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const session = require('express-session');
const settings = require('./settings');

const ActivityRouter = require('./routers/activity');
const LoginRouter = require('./routers/login');
const LogoutRouter = require('./routers/logout');
const MetadataRouter = require('./routers/metadata');
const RoomRouter = require('./routers/room');
const CaptchaRouter = require('./routers/captcha');

const context = {};
context.pool = mysql.createPool(settings.mysqlPool);

const app = express();
app.use(bodyParser.json());
app.use(session(settings.session));
app.get('/', (req, res) => {
  res.send("Hello, world");
});
app.use('/activity', ActivityRouter(context));
app.use('/login', LoginRouter(context));
app.use('/logout', LogoutRouter(context));
app.use('/metadata', MetadataRouter(context));
app.use('/room', RoomRouter(context));
app.use('/captcha', CaptchaRouter(context));
app.listen(settings.port, () => {
  console.log(`Listening at port ${settings.port}`);
});

module.exports = {
  port: 80,
  mysqlPool: {
    connectionLimit: 10,
    host: 'MYSQLSERVER',
    user: 'MYSQLUSER',
    database: 'MYSQLDATABASE'
  },
  session: {
    secret: "SESSIONSECRET",
    resave: false,
    saveUninitialized: false,
  },
  cors: {
    origin: "WEBSERVERORIGIN",
    credentials: true
  },
  initialPassword: 'INITIALPASSWORD',
  salt: 'PASSWORDSALT', // Make sure the same as frontend
  storeConfig: {}
};

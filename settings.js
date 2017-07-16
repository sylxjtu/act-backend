const settings = {
  port: 3000,
  mysqlPool: {
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    database: 'activity'
  },
  session: {
    secret: "sylxjtu",
    resave: false,
    saveUninitialized: false,
  },
  salt: "sylxjtu"
};
module.exports = settings;

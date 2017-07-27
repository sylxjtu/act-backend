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
  cors: {
    origin: "http://localhost:8080",
    credentials: true
  },
  storeConfig: {}
};
module.exports = settings;

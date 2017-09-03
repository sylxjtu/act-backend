module.exports = {
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
  initialPassword: '1234',
  salt: 'sylxjtu', // Make sure the same as frontend
  storeConfig: {}
};

const MongoStore = require("connect-mongo");
const session = require("express-session");

module.exports = function (app) {
  app.use(
    session({
      secret: process.env.SESSION_SECRETE,
      resave: false,
      saveUninitialized: false,
      store: MongoStore.create({ mongoUrl: process.env.MONGO_DB_URI }),
    })
  );
};

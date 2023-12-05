var createError = require("http-errors");
var express = require("express");
var path = require("path");
var logger = require("morgan");
const cors = require("cors");
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv").config();
var flash = require('connect-flash');
const User = require("./models/userModel")
const Tenant = require("./models/tenantModel")
const bcrypt = require("bcryptjs")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var devicesRouter = require("./routes/device");

var app = express();

app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(flash());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Configure express-session
app.use(
  session({
    secret: process.env.SESSION_SECRETE,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl:process.env.MONGO_DB_URI}),
  })
);

// Configure Passport
app.use(passport.initialize());
app.use(passport.session());

//house owner authentication
passport.use("owner",
  new LocalStrategy({
    usernameField: 'phone_number',
    passwordField: 'password',
  },async (phone_number, password, done) =>{

    try {
      //check user in the database
      const user = await User.findOne({ phone_number: phone_number })

      if(user){
        // check passwords
        let isPasswordCorect = await bcrypt.compare(password, user.password);
        if(user && isPasswordCorect){
          return done(null, user);
        }
        return done(null, false, {message: "Incorrect phone number or password"});
  
      }else{
        return done(null, false, {message: "User not found.Please register"})
      }
    } catch (err) {
      return done(err);
    }

  })
);

// tenant strategy
passport.use("tenant",
  new LocalStrategy({
    usernameField: 'phone_number',
    passwordField: 'password',
  },async (phone_number, password, done) =>{
    try {
      //check user in the database
      const user = await Tenant.findOne({ phone_number: phone_number })

      if(user){
        // check passwords
        let isPasswordCorect = await bcrypt.compare(password, user.password);
        if(user && isPasswordCorect){
          return done(null, user);
        }
        return done(null, false, {message: "Incorrect phone number or password"});
  
      }else{
        return done(null, false, {message: "No Tenant account found"})
      }
    } catch (err) {
      return done(err);
    }

  })
);

passport.serializeUser(function (user, done) {
  done(null, { id: user.id, type: user instanceof User ? 'owner' : 'tenant' });
});

passport.deserializeUser(async function(userObj, done) {
  if (userObj.type === 'owner') {
    await User.findById(userObj.id).then((user) => {
      done(null, user) 
    }).catch((err) => {
      done(err, null)
    });
  } else if (userObj.type === 'tenant') {
    await Tenant.findById(userObj.id).then((user) => {
      done(null, user) 
    }).catch((err) => {
      done(err, null)
    });
  } else {
    done('Invalid user type', null);
  }
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/devices", devicesRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

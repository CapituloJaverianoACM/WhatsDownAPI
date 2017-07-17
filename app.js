const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');

/*
 * This file is ignored for security. You have to create your own config file
 * that contains secretKey and mongoUrl.
 * Example: https://github.com/juanpa097/NodeJsCourse/blob/master/rest-resver-passport/config.js
*/
const config = require('./config/config');
const authenticate = require('./controllers/authController');

// Connects to database
mongoose.connect(config.mongoUrl, {useMongoClient: true});
const db = mongoose.connection;
db.on('error',console.error.bind(console, 'connection error:'));
db.once('open', () => { console.log("Connected correctly to database"); });

const index = require('./routes/index');
const users = require('./routes/users');

const ChatController = require('./controllers/chatController');

const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);
app.io = io;
ChatController.iochat(app.io)

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// parse body params and attache them to req.body
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport configuration
app.use(passport.initialize());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount all routes on /api path
app.use('/api', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // return error message.
  res.status(err.status || 500);
  res.json({
    error: 'There has been an error in the server.',
    errorMessage: err.message,
    errorStatus: err.status
  });
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors')
const nodemailer = require("nodemailer");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var farmsRouter = require('./routes/farms');
var addressesRouter = require('./routes/addresses');
var requestsRouter = require('./routes/requests');
var dealsRouter = require('./routes/deals');
var reportsRouter = require('./routes/reports');
var contactRouter = require('./routes/contacts');


require('dotenv').config()

var app = express();
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/farms', farmsRouter);
app.use('/addresses', addressesRouter);
app.use('/requests', requestsRouter);
app.use('/deals', dealsRouter);
app.use('/reports', reportsRouter);
app.use('/contacts', contactRouter);


// app.listen(5000, () => console.log("Server Running"));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.messages = err.messages;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var mongoose=require('mongoose');
mongoose.connect("mongodb://localhost:27017/CRM")

mongoose.connection.on("connected",()=>{
  console.log('connected  to mongodb successfully')
})
var studentModel=require('./models/student.model')

/*

//creating schema..........
var studentSchema=mongoose.Schema({
  studentId:Number,
  firstName:String,
  lastName:String,
  age:Number,
  dob:String,
  department:String
});

//creating model for that schema....MODEL

var Student=mongoose.model('Student',studentSchema)

*/



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var studentRouter=require('./routes/students');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/students',studentRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

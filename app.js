var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');//hello
var bodyParser = require('body-parser');
var mongoose=require('mongoose');
var path=require('path');
var passport = require('passport');
var csrf = require('csurf');

var helmet= require('helmet');
//var LocalStrategy = require('passport-local').Strategy;
var methodoverride= require('method-override');
var session=require('express-session');
var fs=require('fs');
var config = require('./config');



//var csrfProtection = csrf({ cookie: true });  
//var parseForm = bodyParser.urlencoded({ extended: false });







mongoose.connect(config.mongoUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");
});
var users = require('./routes/users');
var index= require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit:'5mb'}));
app.use(bodyParser.urlencoded({limit: '15mb', extended: true }));
app.use(cookieParser());
app.use(express.static('public'));
app.use(session({secret:'1234567890',
                     saveUninitialized:true,
                     resave: true     }));
app.use(express.static(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static());
//app.use(helmet());
app.use(passport.initialize());
app.use('/',index);
app.use('/users', users);

app.engine('.html', require('ejs').__express);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

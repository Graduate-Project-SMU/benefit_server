var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
const config = require('./config/secret');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('jwt-secret', config.secret);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/swagger-ui', express.static(path.join(__dirname, './node_modules/swagger-ui/dist')));

app.use('/v1/swagger.json', function(req, res) {
    res.json(require('./swagger/swagger.json'));
});
app.use('/v1/swagger-hangul.json', function(req, res) {
    res.json(require('./swagger/swagger-hangul.json'));
});
app.use('/swagger', function (req, res) {
    res.redirect('/swagger-ui?url=/v1/swagger.json');
});
app.use('/swagger-hangul', function (req, res) {
    res.redirect('/swagger-ui?url=/v1/swagger-hangul.json');
});

app.use('/', index);


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

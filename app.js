var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var axios = require('axios');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
const headers = {
  'Content-Type': 'application/json',
  Authorization: 'KakaoAK aad44b4820cf7e5af5d62f7838830575',
};

app.post('/v1/push/register', function (req, res) {
  axios
    .post('https://kapi.kakao.com/v1/push/register', null, {
      params: req.body,
      headers: headers,
    })
    .then((response) => {
      res.send('' + response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

app.get('/v1/push/tokens', function (req, res) {
  axios
    .get(`https://kapi.kakao.com/v1/push/tokens?uuid=${req.query.uuid}`, {
      headers: headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

app.post('/v1/push/tokens', function (req, res) {
  axios
    .post('https://kapi.kakao.com/v1/push/tokens', null, {
      params: req.body,
      headers: headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

app.post('/v1/push/deregister', function (req, res) {
  axios
    .post('https://kapi.kakao.com/v1/push/deregister', null, {
      params: req.body,
      headers: headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

app.post('/v1/push/send', function (req, res) {
  axios
    .post('https://kapi.kakao.com/v1/push/send', null, {
      params: req.body,
      headers: headers,
    })
    .then((response) => {
      res.send(response.data);
    })
    .catch(function (error) {
      console.log(error.response);
    });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

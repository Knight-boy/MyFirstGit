var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');      //Third-party middleware
var cookieParser = require('cookie-parser');//Third-party middleware
var bodyParser = require('body-parser');    //Third-party middleware
// var settings = require('./settings');
// var session = require('express-session');
// var flash = require('connect-flash');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));  //false:用qs库解析Url编码；true:用字符串库解析

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(flash());
// app.use(session({
    // secret:settings.cookieSecret,
    // store: new MongoStore({
    //     db: settings.db
    // })
// }));

app.use('/', require('./routes/index'));//index
app.use('/users', require('./routes/users'));//users

app.post('/post',require('./routes/posts'));
app.use('/reg',require('./routes/reg'));
app.post('/reg',require('./routes/doReg'));
app.use('/login',require('./routes/login'));
app.post('/login',require('./routes/doLogin'));
app.use('/logout',require('./routes/logout'));


// app.dynamicHelpers({
//     user:function(req,res) {
//         return req.session.user;
//     },
//     error: function(req,res) {
//         var err = req.flash('error');
//         if(err.length)
//             return err;
//         else
//             return null;
//     },
//     success: function(req,res) {
//         var succ = req.flash('success');
//         if(succ.length)
//             return succ;
//         else
//             return null;
//     }
// });

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

var port = process.env.PORT || 8800;

app.listen(port,() => {
    console.log(`Magic starts on port : ${port}`);
});

module.exports = app;

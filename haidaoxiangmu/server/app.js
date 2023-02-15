var createError = require('http-errors');
//引入express
const express = require('express')
const path=require("path");
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//创建服务器
const app = express()



//静态资源
app.use(express.static(path.join(__dirname,'/data')))
//解决post请求
var bodyParser = require('body-parser');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//跨域请求
const cors = require('cors');
app.use(cors())

//express-Jwt 解析token
const { expressjwt: jwt } = require('express-jwt')
//密钥
var config = require('./config/config')
//token验证
app.use(jwt({
  secret: config.secretKey,
  algorithms: ["HS256"],
  requestProperty: 'user',

}).unless({
  path: config.UnIdentifiedPath
})
)

//index.js
const index = require('./routes/index')
app.use('/api', index)
//user.js
const user = require('./routes/user')
app.use('/api/user', user)
//products.js
const products = require('./routes/aquaculture_products')
app.use('/api/products', products)
//ponds.js
const ponds = require('./routes/aquaculture_ponds')
app.use('/api/ponds', ponds)
//owner.js
const owner = require('./routes/owner')
app.use('/api/owner', owner)
//discussion.js
const discussion = require('./routes/discussion')
app.use('/api/discussion', discussion)
//reply.js
const reply = require('./routes/reply')
app.use('/api/reply', reply)
//area.js
const area = require('./routes/area')
app.use('/api/area', area)
//dialog.js
const dialog = require('./routes/dialog')
app.use('/api/dialog', dialog)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {

  if (err && err.name == 'UnauthorizedError') {
    return res.send({
      status: 401,
      data: {
        msg: 'token过期'
      }
    })
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
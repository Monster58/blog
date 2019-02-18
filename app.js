var express = require('express');
var path = require('path');
var router = require('./router')
var bodyParser = require('body-parser')
var session = require('express-session')
var app = express();
app.use('/public',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));

//配置解析表单POST请求体插件（注意：一定要在app.use(router)之前）
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//在Express这个框架中，默认不支持Session和Cookie
//但是我们可以使用第三方中间件：express-session来解决
//该插件会为req请求对象添加一个成员：req.session默认是一个对象
app.use(session({
  secret: 'keyboard cat', //配置加密字符串，他会在原有加密基础之上和这个字符串拼起来去加密，增加安全性，防止客户端恶意伪造！
  resave: false,
  saveUninitialized: true//无论你是否使用session，都会默认分配一把钥匙。
}))

app.engine('html',require('express-art-template')); 
app.set('views',path.join(__dirname,'./views/'));//默认就是 ./views 目录

//把路由挂载到app中
app.use(router)

// 配置一个处理404中间件
app.use(function(req,res){
	res.render('404.html')
})
//配置一个全局错误处理中间件 
app.use(function(err,req,res,next){
	res.status(500).json({
		err_code: 500,
		message: err.message
	})
})


app.listen(3000,function(){
	console.log('running')
})



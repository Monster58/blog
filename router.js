var express = require('express');
var User = require('./models/user.js')
var md5 = require('blueimp-md5')
var router = express.Router();
router.get('/',function(req,res){
	res.render('index.html',{
		user: req.session.user
	})
})
router.get('/login',function(req,res){
	res.render('login.html')
})
router.post('/login',function(req,res,next){
	/*
		1. 获取表单数据
		2. 查询数据库用户名密码是否正确
		3. 发送响应数据
	*/
	var body = req.body
	User.findOne({
		email: body.email,
		password: md5(md5(body.password))
	},function(err,user){
		if(err){
			/*return res.status(500).json({
				err_code: 500,
				message: err.message
			})*/
			return next(err)
		}

		if(!user){
			return res.status(200).json({
				err_code:　1,
				message: 'Email or Password is invalid'
			})
		}

		// 用户存在，登录成功，通过Session记录登录状态
		req.session.user = user
		res.status(200).json({
			err_code: 0,
			message: 'OK'
		})
	})
})
router.get('/logout',function(req,res){
	// 清除登录状态
	req.session.user = null
	// 重定向到登录页
	res.redirect('/login')
})
router.get('/register',function(req,res){
	res.render('register.html')
})
router.post('/register',function(req,res,next){
	/*
		1. 获取表单提交的数据
			req.body
		2. 操作数据库
			判断用户是否存在
			如果已经存在，不允许注册
			如果不存在，注册新建用户
		3. 发送响应
	*/
	var body = req.body
	User.findOne({
		$or: [
			{
				email: body.email
			},
			{
				nickname: body.nickname
			}
		]
	},function(err,data){
		if(err){
			/*return res.status(500).json({
				err_code: 500,
				message: 'Internal error'
			})*/
			return next(err)
		}
		if(data){
			return res.status(200).json({
				err_code: 1,
				message: 'Email or nickname aleady exists...'
			})
		}

		// 对密码进行md5重复加密
		body.password = md5(md5(body.password))
		new User(body).save(function(err,user){
			if(err){
				/*return res.status(500).json({
					err_code: 500,
					message: 'Internal error'
				})*/
				return next(err)
			}

			// 注册成功，使用Session记录用户的登录状态
			req.session.user = user

			// Express提供了一个响应方法：json
			// 该方法接受一个对象作为参数，它会自动把对象转为字符串再发送给浏览器
			res.status(200).json({
				err_code: 0,
				message: 'ok'
			})
		})
	})
})
module.exports = router
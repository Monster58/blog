# Node综合Web案例
## 目录结构

```
|—— app.js                       项目的入口文件        
|—— controllers                  
|—— models                       存储使用mongoose设计的数据模型
|—— node_modules                 第三方包
|—— package.json                 包描述文件
|—— package-lock.json            第三方包版本锁定文件
|—— public                       公共的静态资源
|—— README.md                    项目说明文件
|—— routes                       如果业务比较多，代码量大，最好把路由按照业务分类存储到routers目录中
|—— router.js                    简单一点把所有的路由都放到这个文件中
|—— views                        存储视图目录
```
## 模板页
- [art-template 子模板](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E5%AD%90%E6%A8%A1%E6%9D%BF)
- [art-template 模板继承](https://aui.github.io/art-template/zh-cn/docs/syntax.html#%E6%A8%A1%E6%9D%BF%E7%BB%A7%E6%89%BF)
## 路由设计
路径     | 方法 |get参数 | post参数|是否需要登录权限|备注
-------- | -----|-------------|---------|---------|-------
/  | GET||||渲染首页
/register |GET||||渲染注册页面
/register| POST||email、nickname、password||处理注册请求
/login|GET||||渲染登录页面
/login|POST||email、password||处理登录请求
/logout|GET||||处理退出请求

## 模型设计
## 功能实现
## 书写步骤
- 创建目录结构
- 整合静态页-模板页
	- include
	- block
	- extend
- 设计用户登录、退出、注册的路由
- 用户注册
	- 先处理好客户端页面的资源(表单控件的name、收集表单数据、发起请求)
	- 服务端
		- 先获取客户端表单请求数据
		- 操作数据库
			- 如果有错，发送500告诉客户端服务器出错
			- 其他的根据业务发送不同的响应数据
- 用户登录
- 用户退出
'use strict';
const response = require('response')
const loginModel = require('./models/login')
const statusModel = require('./models/status')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	var resp = {}
	//简单路由判断
	switch (event.path) {
		//授权登录
		case '/login':
			var loginModelData = await loginModel(event.queryStringParameters.code)
			resp.user = loginModelData
			return response.success(resp)
			break;
		//首页微信状态
		case '/status':
			var statusList = await statusModel.list(event.queryStringParameters)
			resp = statusList
			return response.success(resp)
			break;
		//状态详情
		case '/status/detail':
			var stat = await statusModel.detail(event.queryStringParameters)
			resp = stat
			return response.success(resp)
			break;
		default:

	}
	//返回数据给客户端
	return response.success()
};

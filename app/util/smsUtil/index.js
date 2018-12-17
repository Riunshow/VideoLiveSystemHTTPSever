const QcloudSms = require("qcloudsms_js")

const secret = require('./../secret')

// 短信应用SDK AppID
const appid = secret.appid

// 短信应用SDK AppKey
const appkey = secret.appkey

// 短信模板ID，需要在短信应用中申请
const templateId = 248727

// 签名
const smsSign = "Rainbower"

// 实例化QcloudSms
const qcloudsms = QcloudSms(appid, appkey)

// 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
// function callback(err, res, resData) {
// 	if (err) {
// 			console.log("err: ", err)
// 	} else {
// 			console.log("request data: ", res.req)
// 			console.log("response data: ", resData)
// 	}
// }

const ssender = qcloudsms.SmsSingleSender()

// const params = ["1234", "登录", "5"]
/**
 * @params phoneNumber [String] 手机号码
 * @params params [Array] 模板嵌套内容 eg: ["`${验证码}`", "登录 || 注册", "`${有效期}`"]
 * @params callback(err, res, resData) 回调函数
 */
module.exports = function(phoneNumber, params, callback) {
	console.log('sms start')
	ssender.sendWithParam(86, phoneNumber, templateId, params, smsSign, "", "", callback)
}
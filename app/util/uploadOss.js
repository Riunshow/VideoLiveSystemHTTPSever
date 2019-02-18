const crypto = require('crypto')
const ossConfig = require('./secret')

function resOssToken() {
	const dirPath = '/' 

	let end = new Date().getTime() + 300000
	let expiration = new Date(end).toISOString()
	let policyString = {
		expiration,
		conditions: [
			["content-length-range", 0, 1048576000]
		]
	}
	policyString = JSON.stringify(policyString)
	const policy = new Buffer(policyString).toString('base64')
	const signature = crypto.createHmac('sha1', ossConfig.accessKeySecret).update(policy).digest('base64')
	
	const resData = {
		OSSAccessKeyId: ossConfig.accessKeyId,
		policy,
		signature,
		expiration
	}

	return resData
}

module.exports = resOssToken
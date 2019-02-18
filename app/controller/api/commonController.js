'use strict';

const Controller = require('egg').Controller;
const resOssToken = require('./../../util/uploadOss')

class CommonController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = this.ctx.session
	}

	generateSignature() {
		this.ctx.body = {
			success: true,
			msg: '签名获取成功',
			data: resOssToken()
		}
	}

}

module.exports = CommonController

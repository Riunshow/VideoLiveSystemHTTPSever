'use strict';

const Controller = require('egg').Controller

class LiveWantedController extends Controller {
	constructor(ctx) {
    super(ctx)
    this.LiveWantedService = ctx.service.liveWantedService
	}
	
	// 根据用户id查找用户申请状态
	async getStatusByUserId() {
		const { user_id } = this.ctx.request.body
		const response = await this.LiveWantedService.getStatusByUserId(user_id)
		this.ctx.body = response
	}

	// 修改用户申请状态
	async setStatusByUserId() {
		const { user_id, newStatus } = this.ctx.request.body
		const response = await this.LiveWantedService.setStatusByUserId(user_id, newStatus)
		this.ctx.body = response
	}

	// 用户发起申请
	async sendWantedByUserId() {
		const { user_id, realName, idCardNum } = this.ctx.request.body
		const response = await this.LiveWantedService.sendWantedByUserId(user_id, realName, idCardNum)
		this.ctx.body = response
	}

	// 用户重新申请
	async sendWantedByUserIdAgain() {
		const { user_id, realName, idCardNum } = this.ctx.request.body
		const response = await this.LiveWantedService.sendWantedByUserIdAgain(user_id, realName, idCardNum)
		this.ctx.body = response
	}

	// 查找所有记录
	async getAllApplicationRecord() {
		const response = await this.LiveWantedService.getAllApplicationRecord()
		this.ctx.body = response
	}


}

module.exports = LiveWantedController

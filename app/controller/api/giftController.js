'use strict';

const Controller = require('egg').Controller

class GiftController extends Controller {
	constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.userService;
    this.giftService = ctx.service.giftService;
	}
	
	// 添加默认礼物
	async addDefaultGift() {
		const { giftName, giftAvatar, price } = this.ctx.request.body
		const response = await this.giftService.addDefaultGift(giftName, giftAvatar, price)
		this.ctx.body = response
	}

	// 获取默认礼物列表
	async getDefaultGiftList() {
		const response = await this.giftService.getDefaultGiftList()
		this.ctx.body = response
	}

	// 添加主播专属礼物分组
	async addPersonalGift() {
		const { user_id, giftName, giftAvatar, price } = this.ctx.request.body
		const response = await this.giftService.addPersonalGift(user_id, giftName, giftAvatar, price)
		this.ctx.body = response
	}

	// 获取定制礼物列表
	async getPersonalGift() {
		const response = await this.giftService.getPersonalGift()
		this.ctx.body = response
	}

	// 删除礼物
	async deleteGift() {
		const { giftId } = this.ctx.request.body
		const response = await this.giftService.deleteGift(giftId)
		this.ctx.body = response
	}

  // 根据主播id查询所有礼物
	async getGiftListByUserId() {
		const { userId } = this.ctx.request.body
		const response = await this.giftService.getGiftListByUserId(userId)
		this.ctx.body = response
	}

	// 送礼物
	async sendGIft() {
		const { fromUserId, toUserId, giftId } = this.ctx.request.body
		const response = await this.giftService.sendGIft(fromUserId, toUserId, giftId)
		this.ctx.body = response
	}

	// 礼物榜查询
	async getRichPeopleByUserIdAndRoomId() {
		const { userId } = this.ctx.request.body
		const response = await this.giftService.getRichPeopleByUserIdAndRoomId(userId)
		this.ctx.body = response
	}

}

module.exports = GiftController

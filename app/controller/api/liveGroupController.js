'use strict';

const Controller = require('egg').Controller;

class LiveGroupController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = this.ctx.session
    this.liveGroup = ctx.service.liveGroupService
	}
	
	// 获取所有分类信息
	async getLiveGroupList() {
		const { limit = 10, offset = 0 } = this.ctx.request.query
    const response = await this.liveGroup.getLiveGroupList(limit, parseInt(offset))
    this.ctx.body = response
	}

	// 添加一个新分类
	async addNewLiveGroup() {
		const { groupName, groupAvatar } = this.ctx.request.body
		const response = await this.liveGroup.addNewLiveGroup(groupName, groupAvatar)
		this.ctx.body = response
	}

}

module.exports = LiveGroupController

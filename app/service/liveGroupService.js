'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  constructor(ctx) {
    super(ctx)
    this.LiveGroupModel = ctx.model.LiveGroupModel
    this.LiveModel = ctx.model.LiveModel
  }

	// 获取所有分类信息
	async getLiveGroupList(limit, offset) {
		// const data = await this.LiveGroupModel.getAllCate(limit, offset*limit)

		const data = await this.LiveGroupModel.findAll({
			include: [{
				model: this.LiveModel,
				required: false 
			}]
		})

		return {
			success: true,
			msg: '查找全部直播分类成功',
			data
		}
	}
	
	// 添加一个新分类
	async addNewLiveGroup(groupName, groupAvatar) {
		const data = await this.LiveGroupModel.findOrCreate({
			where: {
				groupName
			},
			defaults: {
				groupName,
				groupAvatar
			}
		})

		if (data[data.length - 1]) {
      return {
        success: true,
        msg: '创建成功',
      }
    }
    return {
      success: false,
      msg: '已存在此分类',
    }
	}


}

module.exports = LiveService;

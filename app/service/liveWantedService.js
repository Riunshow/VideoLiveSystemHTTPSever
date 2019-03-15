'use strict'

const Service = require('egg').Service

class LiveWantedService extends Service {
  constructor(ctx) {
		super(ctx)
    this.UserModel = ctx.model.UserModel
    this.LiveWantedModel = ctx.model.LiveWantedModel
	}
	
	// 根据id查询
	async getStatusByUserId(user_id) {
		const data = await this.LiveWantedModel.findOne({
			user_id
		})

		return {
			data,
			msg: '查看申请成功',
			success: true
		}
	}

	// 根据用户id修改申请状态
	async setStatusByUserId(user_id, newStatus) {
		const data = await this.LiveWantedModel.update({
			status: newStatus
		},{
			where: {
				user_id
			},
		})

		return {
			data,
			msg: '更新申请状态成功',
			success: true
		}
	}

	// 用户发起申请
	async sendWantedByUserId(user_id, realName, idCardNum) {
		const result = await this.LiveWantedModel.findOrCreate({
			where: {
				user_id
			},
			defaults: {
        status: 1,
				realName,
				idCardNum
      }
		})
    if (result[result.length - 1]) {
			return { 
				success: true,
				msg: '发起申请成功'
			}
    }
    return {
      success: false,
      msg: '请勿多次发起申请',
    }
	}


}

module.exports = LiveWantedService
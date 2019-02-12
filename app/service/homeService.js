'use strict'

const Service = require('egg').Service

class HomeService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
		this.UserModel = ctx.model.UserModel
		this.LiveModel = ctx.model.LiveModel
		this.TodayVisitModel = ctx.model.TodayVisitModel
		this.StatisticModel = ctx.model.StatisticModel
	}
	
	// 各种统计
	async getCount(minDate, maxDate) {
		const result = await this.StatisticModel.findAll({
			where: {
				created_at: {
					$gt: minDate,
					$lte: maxDate
				},
			},
			order: [['created_at', 'ASC']]
		})

		return {
			success: true,
			msg: '查询成功',
			data: result
		}	
	}

	// 统计今日人数
	async todayVisit(ip) {
		const result = await this.TodayVisitModel.findOrCreate({
			where: {
				userIp: ip,
			},
			defaults: {
				userIp: ip,
			}
		})
		if (result[result.length - 1]) {
      return {
        success: true,
				msg: '今日访问成功'		
      }
		}
		await this.TodayVisitModel.update({
			userIp: ip
		}, {
			where: {
				userIp: ip,
			}
		})
		return {
			success: true,
			msg: '今日已访问过'
		}
	}

	// 清空今日人数统计表
	async clearTodayVisit() {
		await this.TodayVisitModel.destroy({
			where: {},
			truncate: true
		})
	}

	// 同步数据到统计表中
	async syncDataToDB() {
		const userCount = await this.UserModel.count()
		const liveCount = await this.LiveModel.count()
		const todayVisit = await this.TodayVisitModel.count()

		const result = await this.StatisticModel.create({
			userCount,
			todayVisit,
			liveCount
		})
	}

}

module.exports = HomeService

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

	// 同步数据到统计表中
	async syncDataToDB() {
		Date.prototype.getMonthFormatted = function() {
			const month = this.getMonth() + 1
			return month < 10 ? '0' + month : '' + month
		}
		Date.prototype.getDateFormatted = function() {
			const date = this.getDate()
			return date < 10 ? '0' + date : '' + date
		}

		const userCount = await this.UserModel.count()
		const liveCount = await this.LiveModel.count()
		const todayVisitList = await this.TodayVisitModel.findAll({
			where: {
				updated_at: {
					$gt: `${new Date().getFullYear()}-${new Date().getMonthFormatted()}-${new Date().getDateFormatted()}`,
					$lte: new Date()
				},
			}
		})

		const todayVisit = todayVisitList.length
		const result = await this.StatisticModel.create({
			userCount,
			todayVisit,
			liveCount
		})
	}

}

module.exports = HomeService

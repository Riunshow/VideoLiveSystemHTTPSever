'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.session = this.ctx.session
    this.home = ctx.service.homeService
  }

  // 获取所有统计的人数
  async getAllCount() {
    const { minDate = '1900-01-01T00:00:00', maxDate = '2200-12-31T23:59:59'} = this.ctx.request.body
    const response = await this.home.getCount(minDate, maxDate)
    this.ctx.body = response
  }

  // 统计今日人数
	async getTodayVisit() {    
    const response = await this.home.todayVisit(this.ctx.request.ip)
    this.ctx.body = response
	}

}

module.exports = HomeController
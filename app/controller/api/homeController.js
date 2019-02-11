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
    const response = await this.home.getCount()
    this.ctx.body = response
  }

  // 统计今日人数
	async getTodayVisit() {
    const response = await this.home.todayVisit(this.ctx.request.ip)
    this.ctx.body = response
	}

}

module.exports = HomeController
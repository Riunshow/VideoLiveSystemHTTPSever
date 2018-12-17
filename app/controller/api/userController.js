'use strict'
const ms = require('ms')
const Controller = require('egg').Controller

// helper
const rand = require('./../../util/common').rand

// 获取短信验证码服务
const getSmsCode = require('./../../util/smsUtil/index')

class UserController extends Controller {
  constructor(ctx) {
    super(ctx)
    this.userService = ctx.service.userService
    this.session = this.ctx.session
  }

  // 登录
  async login() {
    this.ctx.validate({
      useraccount: { type: 'email' },
      password: { type: 'string', min: 1, max: 20 },
      rememberMe: { type: 'boolean', required: false },
    })
    const {
      useraccount,
      password,
      rememberMe,
    } = this.ctx.request.body
    const response = await this.userService.login(useraccount, password)
    // if (response.error) this.ctx.status = 403
    if (!response.error && rememberMe) this.ctx.session.maxAge = ms('30d')

    this.ctx.body = response
  }

  // 注册
  async register() {
    this.ctx.validate({
      useraccount: { type: 'string' },
      password: { type: 'string', min: 1, max: 20 },
      nickname: { type: 'string', min: 1, max: 20, required: false },
      avatar: { type: 'url', required: false },
    })
    const {
      useraccount,
      password,
      nickname = 'guest',
      avatar = null,
      smscode
    } = this.ctx.request.body

    let response = null;

    if (smscode == await this.app.redis.get(useraccount)) {
      response = await this.userService.register(useraccount, password, nickname, avatar) 
    }else {
      response = {
        success: false,
        msg: '验证码错误'
      }
    }
    // if (response.error) this.ctx.status = 409
    this.ctx.body = response
  }

  // 获取短信验证码
  async getSmsCode() {
    const { phoneNum } = this.ctx.request.body

    const params = [rand(1000, 9999), '登录', 5]

    const paramsRedis = await this.app.redis.get(phoneNum)

    let response = {}

    if (paramsRedis) {
      response = {
        success: false,
        msg: '请勿重复获取验证码。'
      }
    }else {
      // 发送短信后的回调
      const cb = function(err, res, resData) {
        if (err) {
            console.log("err: ", err)
        } else {
            console.log(resData.errmsg === 'OK' ? '发送成功' : '发送失败')
        }
      }

      // 发送短信
      getSmsCode(phoneNum, params, cb)

      await this.app.redis.set(phoneNum, params[0])
      
      // 过期时间 300秒 5分钟
      await this.app.redis.expire(phoneNum, 300)

      response = {
        success: true,
        code: params[0],
        msg: '验证码获取成功。'
      }
    }

    this.ctx.body = response
  }


  async logout() {
    this.ctx.session = null
    this.ctx.body = '退出成功'
  }

  async modifyInfo() {
    this.ctx.validate({
      nickname: { type: 'string', min: 1, max: 50 },
      avatar: { type: 'url', required: false },
    })
    const { nickname, avatar } = this.ctx.request.body
    const userID = this.ctx.session.user.userID
    const response = await this.userService.modifyInfo(userID, nickname, avatar)
    if (response.error) this.ctx.status = 403
    this.ctx.body = response
  }
  async changePwd() {
    this.ctx.validate({
      oldPwd: { type: 'string', min: 8, max: 20 },
      changedPwd: { type: 'string', min: 8, max: 20 },
    })
    const { changedPwd, oldPwd } = this.ctx.request.body
    const userID = this.ctx.session.user.userID
    const response = await this.userService.changedPwd(userID, oldPwd, changedPwd)
    if (response.error) this.ctx.status = 403
    this.ctx.body = response
  }
  async forgetPwd() {
    this.ctx.validate({
      nickname: { type: 'string', min: 1, max: 20 },
    })
    const { nickname } = this.ctx.request.body
    const response = await this.userService.forgetPwd(nickname)
    this.ctx.body = response
  }
}

module.exports = UserController

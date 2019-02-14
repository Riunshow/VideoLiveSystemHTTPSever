'use strict'

const Service = require('egg').Service

class UserService extends Service {
  constructor(ctx) {
    super(ctx)
    this.ctx = ctx
    this.UserModel = ctx.model.UserModel
  }
  // 注册
  async register(useraccount, password, nickname, avatar) {
    const pwdHash = await this.ctx.genHash(password)
    const result = await this.UserModel.findOrCreate({
      where: {
        useraccount,
      },
      defaults: {
        password: pwdHash,
        nickname,
        avatar,
      },
    })
    if (result[result.length - 1]) {
      return {
        success: true,
        msg: '创建成功',
      }
    }
    return {
      success: false,
      msg: '已存在此用户',
    }
  }

  // 登录
  async login(useraccount, password) {
    const user =  await this.UserModel.findUser(useraccount) || null
    
    if (user && await this.ctx.compare(password, user.get('password'))) {
      console.log('user service login: ', user.get('id'))

      const role = user.get('role')

      this.ctx.session.user = {
        userID: user.get('id'),
        isStreamer: role === 2,
        isAdmin: role === 3,
      }

      return {
        success: true,
        msg: '登录成功',
        data: {
          user: {
            nickname: user.get('nickname'),
            avatar: user.get('avatar'),
            role,
            id: user.get('id')
          },
        },
      }
    }
    return {
      success: false,
      msg: '用户名或密码错误',
    }
  }

  // 
  async modifyInfo(userID, nickname, avatar) {
    const result = this.UserModel.update({
      nickname,
      avatar,
    }, {
      where: {
        id: userID,
      },
    })
    return {
      error: false,
      data: result,
    }
  }
  async changePwd(id, oldPwd, changedPwd) {
    const user = this.UserModel.findUserByID(id)
    if (user && this.ctx.compare(oldPwd, user.get('password'))) {
      this.UserModel.update({
        password: this.ctx.genHash(changedPwd),
      }, {
        where: {
          id,
        },
      })
      return {
        error: false,
        data: '登录成功',
      }
    }
    return {
      error: true,
      data: '密码错误',
    }
  }
  // async forgetPwd() {

  // }
}

module.exports = UserService
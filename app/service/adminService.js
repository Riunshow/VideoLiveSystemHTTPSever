'use strict'

const Service = require('egg').Service

class AdminService extends Service {
  constructor(ctx) {
    super(ctx)
    this.UserModel = ctx.model.UserModel
    this.LiveModel = ctx.model.LiveModel
  }

  // 获取用户列表 分页
  async getUserList(limit, offset) {
    const data = await this.UserModel.getAllUser(limit, offset*limit)
    const count = await this.UserModel.count()

    return { 
      success: true,
      msg: '查询用户列表成功', 
      data,
      count
    }
  }

  // 根据id获取单个用户
  async getUserById(id) {
    const data = await this.UserModel.findUserByID(id)

    return {
      success: true,
      msg: `查询 id=${id} 用户成功`,
      data
    }
  }

  // 根据用户权限获取用户
  async getUserByRole(limit, offset, role) {
    const data = await this.UserModel.findAllUserByRole(limit, offset*limit, role)
    const count = await this.UserModel.count({
      where: {
        role
      }
    })

    return {
      success: true,
      msg: `查询 role=${role} 用户成功`,
      data,
      count
    }
  }

  // 修改用户权限
  async changeUserRole(userID, role) {
    const data = await this.UserModel.update({
      role
    }, {
      where: {
        id: userID,
      },
    })

    const message = data !== 0 ? '修改成功' : '修改失败'

    return { 
      success: data !== 0, 
      msg: message
    }
  }

  // 用户昵称 模糊查询
  async getUserByNickNameOrAccount(limit, offset, nickname, useraccount) {
    const data = await this.UserModel.findAllUserByNicknameOrAccount(limit, offset*limit, nickname, useraccount)
    const count = await this.UserModel.count({
      where: {
        $or: [
          {
            nickname: {
              $like: `%${nickname}%`
            }
          },
          {
            useraccount: {
              $like: `%${useraccount}%`
            }
          }
        ]
      }
    })

    return {
      success: true,
      msg: '查询成功',
      count,
      data
    }
  }

  // 删除某一用户
  async deleteUserById(userId) {
    if (this.ctx.session.user.userId == userId) {
      return {
        success: false,
        msg: '不可以删除自己的账户'
      }
    }
    const data = await this.UserModel.destroy({
      where: {
        id: userId
      }
    })
    return {
      success: data !== 0 ? true : false,
      msg: data !== 0 ? '删除成功' : '删除失败',
    }
  }

  // 修改用户信息
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
      success: true,
      data: result
    }
  }

  async getRoomList(limit, offset) {
    const data = await this.LiveModel.getAllRoom(limit, offset);
    return { error: false, data };
  }

  async changeRoomStatus(roomID, status) {
    const data = await this.LiveModel.update({
      status,
    }, {
      where: {
        roomID,
      },
    });
    return { error: false, data };
  }

}

module.exports = AdminService;

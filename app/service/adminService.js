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

  async changeUserRole(userID, role) {
    const data = await this.UserModel.update({
      role,
    }, {
      where: {
        id: userID,
      },
    });
    const message = data !== 0 ? '修改成功' : '修改失败';
    return { error: data === 0, data: message };
  }


}

module.exports = AdminService;

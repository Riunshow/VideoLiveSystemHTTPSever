'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.userService = ctx.service.userService;
    this.adminService = ctx.service.adminService;
  }

  // 获取
  async getUserById() {
    const { userId } = this.ctx.request.body
    const response = await this.adminService.getUserById(userId)
    this.ctx.body = response
  }

  // 获取用户列表
  async getUserList() {
    const { limit = 10, offset = 0 } = this.ctx.request.query
    const response = await this.adminService.getUserList(limit, parseInt(offset))
    this.ctx.body = response
  }

  // 根据权限分类查找用户
  async getUserByRole() {
    const { limit = 10, offset = 0 } = this.ctx.request.query
    const { userRole } = this.ctx.request.body
    const response = await this.adminService.getUserByRole(limit, parseInt(offset), userRole)
    this.ctx.body = response
  }

  // 修改用户权限
  async changeUserRole() {
    const { userID, role } = this.ctx.request.body
    const response = await this.adminService.changeUserRole(userID, role)
    this.ctx.body = response
  }

  // 根据昵称模糊搜索
  async getUserByNickNameOrAccount() {
    const { limit = 10, offset = 0 } = this.ctx.request.query
    const { nickname, useraccount } = this.ctx.request.body
    const response = await this.adminService.getUserByNickNameOrAccount(limit, parseInt(offset), nickname, useraccount)
    this.ctx.body = response
  }

  // 根据某一用户id删除该用户信息
  async deleteUserById() {
    const { userId } = this.ctx.request.body
    const response = await this.adminService.deleteUserById(userId)
    this.ctx.body = response
  }

  // 修改用户信息
  async updateUserById() {
    const { userID, nickname, avatar } = this.ctx.request.body
    const response = await this.adminService.modifyInfo(userID, nickname, avatar)
    this.ctx.body = response
  }

  async getRoomList() {
    const { limit = 10, offset = 0 } = this.ctx.request.query;
    const response = await this.adminService.getRoomList(limit, offset);
    this.ctx.body = response;
  }

  async changeRoomStatus() {
    const { roomID, status } = this.ctx.request.body;
    const response = await this.adminService.changeRoomInfo(roomID, status);
    this.ctx.body = response;
  }

}

module.exports = AdminController;

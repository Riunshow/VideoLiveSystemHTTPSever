'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = this.ctx.session
    this.live = ctx.service.liveService;
    this.admin = ctx.service.adminService;
  }

  // 根据分类id查询详细信息
  async getInfoByGroupId() {
    const { live_group_id } = this.ctx.request.body
    const response = await this.live.getInfoByGroupId(live_group_id)
    this.ctx.body = response
  }

  // 根据 live_gourp_id 查询所有的直播间 根据房间人数排序
  async getInfoByGroupIdDESC() {
    const { live_group_id } = this.ctx.request.body
    const response = await this.live.getInfoByGroupIdDESC(live_group_id)
    this.ctx.body = response
  }

  // 模糊查询主播名或房间名
  async findLiveInfoByName() {
    const { name, live_group_id } = this.ctx.request.body
    const response = await this.live.findLiveInfoByName(name, live_group_id)
    this.ctx.body = response
  }

  // 获取所有直播列表
  async getLiveList() {
    const { offset, limit } = this.ctx.params
    const response = await this.live.getLiveList(offset, limit)
    this.ctx.body = response
  }

  // 根据房间id获取房间信息
  async getLiveInfoByRoomId() {
    const { roomId } = this.ctx.request.body
    const response = await this.live.getLiveInfoByRoomId(roomId)
    this.ctx.body = response
  }

  async startLiveStream() {
    const { roomID } = this.ctx.params
    const response = await this.live.startLiveStream(roomID);
    this.ctx.body = response;
  }
  async shutLiveStream() {
    const { roomID } = this.ctx.params;
    const response = await this.live.shutLiveStream(roomID);
    this.ctx.body = response;
  }
  async applicationRoom() {
    const userID = this.ctx.session.user ? this.ctx.session.user.userID : null;
    const { title, cover } = this.ctx.request.body;
    const response = await this.live.applicationRoom(userID, title, cover);
    this.ctx.body = response;
  }

  async deleteRoom() {
    const { roomID } = this.ctx.params;
    const response = await this.live.deleteRoom(roomID);
    this.ctx.body = response;
  }
  async changeRoomInfo() {
    const { roomID } = this.ctx.params;
    const { title, cover } = this.ctx.request.body;
    const response = await this.live.changeRoomInfo(roomID, title, cover);
    this.ctx.body = response;
  }
  async search() {
    console.log(this.session)
    this.ctx.body = this.session
  }

}

module.exports = LiveController;

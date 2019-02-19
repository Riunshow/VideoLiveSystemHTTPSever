'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  constructor(ctx) {
    super(ctx);
    this.LiveModel = ctx.model.LiveModel;
    this.UserModel = ctx.model.UserModel;

    this.nsp = ctx.app.io.of('/');
  }

  // 根据 live_gourp_id 查询所有的直播间
  async getInfoByGroupId(live_group_id) {
    const data = await this.LiveModel.findAll({
      where: {
        live_group_id,
      }
    })

    return {
      success: true,
      msg: '查询分类内信息成功',
      data
    }
  }

  async _checkRoomStatus(roomID) {
    const data = await this.LiveModel.findOne({
      where: {
        roomID,
      },
    });
    const status = data === null ? -1 : data.get('status');
    return status;
  }
  
  async getLiveList(offset, limit) {
    const data = await this.LiveModel.findAll({
      where: {
        status: 1,
      },
      limit,
      offset,
    });
    return data;
  }


  async startLiveStream(roomID) {
    const status = await this._checkRoomStatus(roomID);
    let message = status === 1 ? '直播间已启动' : '无此直播间';
    if (status === 0) {
      this.LiveModel.update({
        status: 1,
      }, {
        where: {
          roomID,
        },
      });
      message = `${roomID}直播间开启成功`;
    }
    return message;
  }
  async shutLiveStream(roomID) {
    const status = await this._checkRoomStatus(roomID);
    let message = status === 0 ? '直播间已关闭' : '无此直播间';
    if (status === 1) {
      this.LiveModel.update({
        status: 0,
      }
        , {
        where: {
          roomID,
        },
      });
      message = `${roomID}直播间关闭成功`;
    }
    return message;
  }
  async applicationRoom(userID, cover, title) {
    console.log(userID)
    let message;
    if (!userID) {
      console.log(23333);
      message = { error: true, data: '未登录' }
    }else {
      const data = await this.LiveModel.findOrCreate({
        where: { user_id: userID },
        defaults: {
          cover,
          title,
        },
      });
      if (data[data.length - 1]) message = { error: false, data: '创建成功' };
      else message = { error: true, data: '该用户已经拥有直播间' };
    }

    return message;
  }

  async deleteRoom(roomID) {
    const data = await this._checkRoomStatus(roomID);
    let message;
    switch (data) {
      case -1:
        message = '直播间不存在';
        break;
      case 0:
        await this.LiveModel.destroy({
          where: { roomID },
        });
        message = `删除直播间${roomID}成功`;
        break;
      case 1:
        message = '直播间正在直播,无法删除';
        break;
      default:
        break;
    }
    return message;
  }
  async changeRoomInfo(roomID, title, cover) {
    const data = await this.LiveModel.update({
      title,
      cover,
    }, {
      where: {
        roomID,
      },
    });
    return data;
  }
}

module.exports = LiveService;

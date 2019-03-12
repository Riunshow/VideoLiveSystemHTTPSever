// {app_root}/app/io/controller/default.js
'use strict';

const Controller = require('egg').Controller;

class DefaultController extends Controller {
  async message() {
    const { ctx } = this;

    const { roomId, userId } = ctx.socket.handshake.query;
    const message = ctx.args[0];
    // await ctx.socket.to(roomId).emit('msg', userId, message);
  }


}

module.exports = DefaultController;

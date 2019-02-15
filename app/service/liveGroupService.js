'use strict';

const Service = require('egg').Service;

class LiveService extends Service {
  constructor(ctx) {
    super(ctx);
    this.LiveModel = ctx.model.LiveGroupModel
  }


}

module.exports = LiveService;

'use strict';

const Controller = require('egg').Controller;

class LiveController extends Controller {
  constructor(ctx) {
    super(ctx);
    this.session = this.ctx.session
    this.live = ctx.service.liveGroupService
  }


}

module.exports = LiveController;

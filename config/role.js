'use strict';
module.exports = function(app) {
  app.role.use('admin', ctx => {
    return ctx.session.user && ctx.session.user.isAdmin;
  });
  app.role.use('streamer', ctx => {
    return ctx.session.user && ctx.session.user.isStreamer;
  });

  app.role.use('logged', ctx => {
    return ctx.session.user !== undefined;
  });
  app.role.use('owned', async ctx => {
    const live = await ctx.service.getRoomInfo(ctx.params.roomID);
    return live.userID === ctx.session.user.userID;
  });

};

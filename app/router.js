'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    io,
  } = app;

  const isAdmin = app.role.can('admin');

  const logged = app.role.can('logged');

  const owned = app.role.can('owned');

  const isStreamer = app.role.can('streamer');


  router.post('/api/user/register', controller.api.userController.register);

  router.post('/api/user/login', controller.api.userController.login);

  router.get('/api/user/logout', controller.api.userController.logout);

  router.post('/api/user/changePwd', logged, controller.api.userController.changePwd);

  router.post('/api/user/forgetPwd', logged, controller.api.userController.forgetPwd);

  router.put('/api/user/modifyInfo', logged, controller.api.userController.modifyInfo);

  router.get('/api/admin/userList', isAdmin, controller.api.adminController.getUserList);

  router.get('/api/admin/roomList', isAdmin, controller.api.adminController.getRoomList);

  router.put('/api/admin/changeUserRole', isAdmin, controller.api.adminController.changeUserRole);

  router.put('/api/admin/changeRoomStatus', isAdmin, controller.api.adminController.changeRoomStatus);


  io.of('/').route('msg', io.controller.index.message);


  // 直播相关接口
  router.get('/api/live', controller.api.liveController.getLiveList);

  router.get('/api/live/start/:roomID', controller.api.liveController.startLiveStream);

  router.get('/api/live/shutdown/:roomID', controller.api.liveController.shutLiveStream);

  router.put('/api/live/:roomID/info', owned, controller.api.liveController.changeRoomInfo);

  // router.post('/live/application', isStreamer, controller.api.liveController.applicationRoom);
  router.post('/api/live/application', controller.api.liveController.applicationRoom);

  router.delete('/api/live/:roomID', owned, controller.api.liveController.startLiveStream);

  router.get('/api/live/search', controller.api.liveController.search);


};

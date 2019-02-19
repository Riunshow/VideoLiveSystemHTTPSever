'use strict'

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const {
    router,
    controller,
    io,
  } = app

  const isAdmin = app.role.can('admin')

  const logged = app.role.can('logged')

  const owned = app.role.can('owned')

  const isStreamer = app.role.can('streamer')

  // -------- 公共接口
  router.get('/api/common/uploadToken', controller.api.commonController.generateSignature)

  // -------- 统计相关接口

  // 获取全部统计
  router.post('/api/home/count', controller.api.homeController.getAllCount)
  
  // 今日访问记录
  router.get('/api/home/todayVisit', controller.api.homeController.getTodayVisit)

  // -------- 用户相关接口

  // 获取验证码
  router.post('/api/user/smscode', controller.api.userController.getSmsCode)

  // 注册
  router.post('/api/user/register', controller.api.userController.register)

  // 登录
  router.post('/api/user/login', controller.api.userController.login)

  // 退出
  router.get('/api/user/logout', controller.api.userController.logout)

  router.post('/api/user/changePwd', logged, controller.api.userController.changePwd)

  router.post('/api/user/forgetPwd', logged, controller.api.userController.forgetPwd)

  router.put('/api/user/modifyInfo', logged, controller.api.userController.modifyInfo)

  // 查询全部用户
  router.get('/api/admin/userList', isAdmin, controller.api.adminController.getUserList)

  // 根据 userId 查找用户
  router.post('/api/admin/userById', isAdmin, controller.api.adminController.getUserById)

  // 根据 user role 查找用户
  router.post('/api/admin/userByRole', isAdmin, controller.api.adminController.getUserByRole)

  // 根据 nickname || account 查找用户
  router.post('/api/admin/userByNickname', isAdmin, controller.api.adminController.getUserByNickNameOrAccount)

  // 修改用户权限
  router.put('/api/admin/changeUserRole', isAdmin, controller.api.adminController.changeUserRole)

  // 删除用户
  router.delete('/api/admin/deleteUserById', isAdmin, controller.api.adminController.deleteUserById)

  // 管理员更新用户数据
  router.put('/api/admin/updateUserById', isAdmin, controller.api.adminController.updateUserById)

  router.get('/api/admin/roomList', isAdmin, controller.api.adminController.getRoomList)

  router.put('/api/admin/changeRoomStatus', isAdmin, controller.api.adminController.changeRoomStatus)


  io.of('/').route('msg', io.controller.index.message)


  // ----------------   直播相关接口

  // 获取直播分类信息
  router.get('/api/admin/getLiveGroupList', isAdmin, controller.api.liveGroupController.getLiveGroupList)
  
  // 添加一个新分类
  router.post('/api/admin/addNewLiveGroup', isAdmin, controller.api.liveGroupController.addNewLiveGroup)

  // 获取直播分类信息详情
  router.post('/api/admin/getInfoByGroupId', isAdmin, controller.api.liveController.getInfoByGroupId)

  router.get('/api/live', controller.api.liveController.getLiveList)

  router.get('/api/live/start/:roomID', controller.api.liveController.startLiveStream)

  router.get('/api/live/shutdown/:roomID', controller.api.liveController.shutLiveStream)

  router.put('/api/live/:roomID/info', owned, controller.api.liveController.changeRoomInfo)

  router.post('/api/live/application', isStreamer, controller.api.liveController.applicationRoom)

  router.delete('/api/live/:roomID', owned, controller.api.liveController.startLiveStream)

  router.get('/api/live/search', controller.api.liveController.search)


}

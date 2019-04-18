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

  // ---------- 直播间申请接口

	// 根据用户id查找用户申请状态
  router.post('/api/wanted/getStatusByUserId', controller.api.liveWantedController.getStatusByUserId)
  
  // 修改用户申请状态
  router.put('/api/wanted/setStatusByUserId', isAdmin, controller.api.liveWantedController.setStatusByUserId)

  // 申请直播间
  router.post('/api/wanted/sendWantedByUserId', controller.api.liveWantedController.sendWantedByUserId)

  // 重新申请
  router.post('/api/wanted/sendWantedByUserIdAgain', controller.api.liveWantedController.sendWantedByUserIdAgain)

  // 查找所有记录
  router.get('/api/wanted/getAllApplicationRecord', controller.api.liveWantedController.getAllApplicationRecord)


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
  router.post('/api/admin/userById', controller.api.adminController.getUserById)

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
  router.get('/api/admin/getLiveGroupList', controller.api.liveGroupController.getLiveGroupList)
  
  // 添加一个新分类
  router.post('/api/admin/addNewLiveGroup', isAdmin, controller.api.liveGroupController.addNewLiveGroup)

  // 获取直播分类信息详情
  router.post('/api/admin/getInfoByGroupId', controller.api.liveController.getInfoByGroupId)

  // 获取直播分类信息详情 根据房间人数排序
  router.post('/api/admin/getInfoByGroupIdDESC', controller.api.liveController.getInfoByGroupIdDESC)

  // 直播分类信息详情 模糊搜索 主播名或房间名
  router.post('/api/admin/findLiveInfoByName', controller.api.liveController.findLiveInfoByName)

  // 获取所有直播列表
  router.get('/api/live', controller.api.liveController.getLiveList)

  // 获取所有直播列表 根据人气排序
  router.get('/api/live/getLivListByAttendance', controller.api.liveController.getLivListByAttendance)

  // 根据房间id获取房间信息
  router.post('/api/live/getLiveInfoByRoomId', controller.api.liveController.getLiveInfoByRoomId)

  // 开始直播
  router.post('/api/live/application', controller.api.liveController.applicationRoom)

  // 通过token获取room信息
  router.post('/api/live/getRoomIdByToken', controller.api.liveController.getRoomIdByToken)


  router.get('/api/live/start/:roomID', controller.api.liveController.startLiveStream)

  router.get('/api/live/shutdown/:roomID', controller.api.liveController.shutLiveStream)

  router.put('/api/live/:roomID/info', owned, controller.api.liveController.changeRoomInfo)


  router.delete('/api/live/:roomID', owned, controller.api.liveController.startLiveStream)

  router.get('/api/live/search', controller.api.liveController.search)

  // ----------------   礼物相关接口
  // 添加默认礼物
  router.post('/api/gift/addDefaultGift', controller.api.giftController.addDefaultGift)
  
  // 查询默认礼物列表
  router.get('/api/gift/getDefaultGiftList', controller.api.giftController.getDefaultGiftList)

  // 添加主播定制礼物
  router.post('/api/gift/addPersonalGift', controller.api.giftController.addPersonalGift)

  // 查询定制礼物列表
  router.get('/api/gift/getPersonalGift', controller.api.giftController.getPersonalGift)

  // 删除礼物
  router.delete('/api/gift/deleteGift', controller.api.giftController.deleteGift)
  
  // 根据主播id查询所有礼物
  router.post('/api/gift/getGiftListByUserId', controller.api.giftController.getGiftListByUserId)

  // 送礼物
  router.post('/api/gift/sendGIft', controller.api.giftController.sendGIft)

  // 礼物榜查询
  router.post('/api/gift/getRichPeopleByUserIdAndRoomId', controller.api.giftController.getRichPeopleByUserIdAndRoomId)

}

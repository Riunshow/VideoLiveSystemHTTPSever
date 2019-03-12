'use strict'

module.exports = () => {
  return async (ctx, next) => {
    const { app, socket, logger } = ctx
    const id = socket.id
    const LiveModel = ctx.model.LiveModel
    const nsp = app.io.of('/')
    const query = socket.handshake.query
    const { roomId, userId } = query
    const rooms = [ roomId ]
    let lastRoomIdT = null

    const tick = (id, msg) => {
      logger.debug('#tick', id, msg)

      // 踢出用户前发送消息
      socket.emit(id, msg)

      // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件

      socket.emit('pissoff', 'roomId not found')
    }
    
    const hasRoom = await LiveModel.findOne({
      where: {
        roomID: roomId,
        // status: 1,
      },
    })

    if (!hasRoom) {
      tick(id, {
        type: 'deleted',
        message: 'deleted, roomId has been deleted.',
      })
      return
    }

    socket.on('join', () => {
      socket.join(roomId)    // 加入房间
      nsp.to(roomId).emit('sys', '用户' + userId + '加入了房间' + roomId)
      console.log('用户' + userId + '加入了房间' + roomId)
    })

    socket.on('leave', (lastRoomId) => {
      socket.emit('disconnect', lastRoomId)
    })

    socket.on('disconnect', (lastRoomId) => {
      lastRoomIdT = lastRoomId
      socket.leave(lastRoomId)
      nsp.to(lastRoomId).emit('sys', '用户' + userId + '退出了房间' + lastRoomId)
      console.log('用户' + userId + '退出了房间' + lastRoomId)
    })


    socket.on('message', (nickname, msg) => {
      nsp.to(roomId).emit('msg', {nickname, msg})
    })



    // 在线列表
    nsp.adapter.clients(rooms, (err, clients) => {
      console.log('**************  join')
      // 更新在线用户列表
      nsp.to(roomId).emit('online', {
        clients,
        action: 'join',
        message: `User(${userId}) joined room${roomId}.`,
      })
    })
    await next()


    nsp.adapter.clients(rooms, (err, clients) => {
      console.log('**************  leaved')
      // 更新在线用户列表
      nsp.to(roomId).emit('online', {
        clients,
        action: 'leave',
        message: `User(${userId}) leaved room.`,
      })
    })
    // execute when disconnect.

  }
}

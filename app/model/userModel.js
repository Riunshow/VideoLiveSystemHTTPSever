'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

  /**
   * @desc user 用户表
   * id: id
   * useraccount: 登录账户名 手机号
   * nickname: 用户昵称
   * password: 用户密码
   * avatar: 用户头像
   * role: 用户权限  -1为封禁用户,1为普通用户,2为主播,3为管理员
   */
  const UserModel = app.model.define('user', {
    id: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    useraccount: {
      type: STRING(50),
      allowNull: false,
    },
    nickname: {
      type: STRING(50),
      allowNull: true,
      defaultValue: 'guest',
    },
    password: {
      type: STRING(100),
      allowNull: false,
    },
    avatar: {
      type: STRING(200),
      allowNull: true,
    },
    role: {
      type: INTEGER(3),
      allowNull: false,
      defaultValue: 0, // -1为封禁用户,1为普通用户,2为主播,3为管理员
    },
    balance: {
      type: INTEGER(20),
      allowNull: false,
      defaultValue: 0,
    }
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
  })

  UserModel.findUser = async function (useraccount) {
    return await this.findOne({
      where: {
        useraccount,
      },
    })
  }

  UserModel.getAllUser = async function (limit, offset) {
    return await this.findAll({
      limit,
      offset,
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'role', 'balance', 'created_at', 'updated_at'],
    })
  }

  UserModel.findUserByID = async function (userID) {
    return await this.findOne({
      where: {
        id: userID,
      },
    })
  }

  UserModel.findAllUserByRole = async function (limit, offset, role) {
    return await this.findAll({
      where: {
        role
      },
      limit,
      offset,
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'role', 'balance', 'created_at', 'updated_at'],
    })
  }

  UserModel.findAllUserByNicknameOrAccount = async function (limit, offset, nickname, useraccount) {
    return await this.findAll({
      where: {
        $or: [
          {
            nickname: {
              $like: `%${nickname}%`
            }
          },
          {
            useraccount: {
              $like: `%${useraccount}%`
            }
          }
        ]
      },
      limit,
      offset,
      attributes: ['id', 'useraccount', 'nickname', 'avatar', 'role', 'balance', 'created_at', 'updated_at'],
    })
  }

  UserModel.associate = function () {
    UserModel.hasOne(app.model.LiveModel)
    UserModel.hasOne(app.model.GiftGroupModel)
    UserModel.hasMany(app.model.GiftRecordModel, {
      foreignKey: 'get_gift_user_id'
    })
    UserModel.hasMany(app.model.GiftRecordModel, {
      foreignKey: 'send_gift_user_id'
		})
  }
  return UserModel
}
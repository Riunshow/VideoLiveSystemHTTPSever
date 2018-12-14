'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize
  /**
   * LiveModel
   * @desc
   * roomID: 房间id
   * cover: 房间封面图片
   * title: 房间标题
   * status: 房间状态
   * Attendance: 观众人数
   * hot: 热度
   */
  const LiveModel = app.model.define('live', {
    roomID: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cover: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
    },
    title: {
      type: STRING(200),
      allowNull: false,
      defaultValue: 'welcome to my room',
    },
    status: {
      type: INTEGER(3),
      allowNull: false,
      defaultValue: 0,
    },
    Attendance: {
      type: INTEGER(11),
      allowNull: false,
      deafultValue: 0
    },
    hot: {
      type: INTEGER(11),
      allowNull: false,
      deafultValue: 0
    }
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
  })

  LiveModel.getAllRoom = async function(limit, offset) {
    return await this.findAll({
      limit,
      offset,
    })
  }
  LiveModel.associate = function() {
    LiveModel.belongsTo(app.model.UserModel, {
      foreignKey: 'user_id'
    })
    LiveModel.belongsTo(app.model.LiveGroupModel, {
      foreignKey: 'live_group_id',
      onDelete: 'cascade'
    })
  }
  return LiveModel
}

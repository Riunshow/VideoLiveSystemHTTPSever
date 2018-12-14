'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize

	/**
	 * @desc 直播间分组
	 * id: 分组id
	 * groupName： 分组名称
	 * groupAvatar: 分组背景图片
	 */
  const LiveGroupModel = app.model.define('liveGroup', {
    liveGroupId: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    groupName: {
      type: STRING(50),
      allowNull: false,
		},
		groupAvatar: {
			type: STRING(50),
			allowNull: false,
		}
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
  })

  LiveGroupModel.associate = function() {
    LiveGroupModel.hasMany(
			app.model.LiveModel, 
			{
				foreignKey: 'live_group_id'
			})
  }
  return LiveGroupModel
}

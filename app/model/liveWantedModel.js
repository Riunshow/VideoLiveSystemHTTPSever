'use strict'

module.exports = app => {
	const {
		INTEGER,
		STRING
	} = app.Sequelize

	/*
		用户申请主播表
	*/
	const LiveWantedModel = app.model.define('liveWanted', {
		wantedId: {
			type: INTEGER(20),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		status: {
			type: INTEGER(20),
      allowNull: false,
		},
		realName: {
			type: STRING(200),
      allowNull: false,
      defaultValue: '',
		},
		idCardNum: {
			type: STRING(200),
      allowNull: false,
      defaultValue: '',
		},
	}, {
		createAt: 'created_at',
		updateAt: 'updated_at',
		freezeTableName: true
	})
  LiveWantedModel.associate = function() {
    LiveWantedModel.belongsTo(app.model.UserModel, {
      foreignKey: 'user_id'
    })
  }

	return LiveWantedModel
}
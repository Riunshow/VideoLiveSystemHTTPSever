'use strict'

module.exports = app => {
	const {
		INTEGER,
		STRING
	} = app.Sequelize

	/*
		今日访问人数表
		userIp 用户ip
	*/
	const TodayVisitModel = app.model.define('todayVisit', {
		todayVisitId: {
			type: INTEGER(20),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userIp: {
      type: STRING(200),
      allowNull: false,
      defaultValue: '',
		},
	}, {
		createAt: 'created_at',
		updateAt: 'updated_at',
		freezeTableName: true
	})


	return TodayVisitModel
}
'use strict'

module.exports = app => {
	const {
		INTEGER,
		STRING
	} = app.Sequelize

	/*
		统计表
		userCount  注册用户数
		todayVisit 今日访问用户数
		liveCount  直播用户数
	*/
	const StatisticModel = app.model.define('statistic', {
		statisticId: {
			type: INTEGER(20),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		userCount: {
			type: INTEGER(20),
      allowNull: false,
		},
		todayVisit: {
			type: INTEGER(20),
      allowNull: false,
		},
		liveCount: {
			type: INTEGER(20),
      allowNull: false,
		}
	}, {
		createAt: 'created_at',
		updateAt: 'updated_at',
		freezeTableName: true
	})


	return StatisticModel
}
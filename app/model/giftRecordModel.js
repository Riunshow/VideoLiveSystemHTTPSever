'use strict'

module.exports = app => {
	const {
		INTEGER,
		STRING
	} = app.Sequelize

	const GiftRecordModel = app.model.define('giftRecord', {
		giftRecordId: {
			type: INTEGER(20),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		}
	}, {
		createAt: 'created_at',
		updateAt: 'updated_at',
		freezeTableName: true
	})

	GiftRecordModel.associate = function() {
		
		GiftRecordModel.belongsTo(app.model.UserModel, {
      foreignKey: 'get_gift_user_id'
		})
		GiftRecordModel.belongsTo(app.model.UserModel, {
      foreignKey: 'send_gift_user_id'
		})
		GiftRecordModel.hasMany(app.model.GiftModel, {
      foreignKey: 'gift_record_id'
		})
	}

	return GiftRecordModel
}
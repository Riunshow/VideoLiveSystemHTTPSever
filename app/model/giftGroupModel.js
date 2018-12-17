'use strict'

module.exports = app => {
	const {
		INTEGER,
		STRING
	} = app.Sequelize

	const GiftGroupModel = app.model.define('giftGroup', {
		giftGroupId: {
			type: INTEGER(20),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		giftGroupName: {
			type: STRING(100),
      allowNull: false,
		}
	}, {
		createAt: 'created_at',
		updateAt: 'updated_at',
		freezeTableName: true
	})

	GiftGroupModel.associate = function() {
		
		GiftGroupModel.hasMany(app.model.GiftModel,{
			foreignKey:'gift_group_id'
		})

		GiftGroupModel.belongsTo(app.model.UserModel, {
      foreignKey: 'user_id'
    })
	}

	return GiftGroupModel
}
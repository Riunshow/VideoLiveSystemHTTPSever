'use strict'

module.exports = app => {
  const {
    STRING,
    INTEGER,
  } = app.Sequelize
  /**
   * LiveModel
   * @desc
   * id: 房间id
	 * giftName: 礼物名字
	 * giftAvatar: 礼物图片
	 * price: 礼物价格
   */
  const GiftModel = app.model.define('gift', {
    giftId: {
      type: INTEGER(20),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
		},
		giftName: {
			type: STRING(100),
      allowNull: false,
		},
		giftAvatar: {
			type: STRING(100),
      allowNull: false,
		},
		price: {
			type: STRING(100),
      allowNull: false,
		}
  }, {
    created_at: 'created_at',
    updated_at: 'updated_at',
    freezeTableName: true,
  })
	
  GiftModel.associate = function() {
		GiftModel.belongsTo(
			app.model.GiftGroupModel, 
			{
				foreignKey: 'gift_group_id',
				onDelete: 'cascade'
			}
    )
    
    GiftModel.hasMany(
			app.model.GiftRecordModel, 
			{
				foreignKey: 'gift_id',
			}
		)
	}
	
  return GiftModel
}

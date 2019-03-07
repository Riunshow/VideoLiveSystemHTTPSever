'use strict'

const Service = require('egg').Service

class GiftService extends Service {
  constructor(ctx) {
		super(ctx)
    this.UserModel = ctx.model.UserModel		
    this.GiftModel = ctx.model.GiftModel
    this.GiftGroupModel = ctx.model.GiftGroupModel
	}
	
	// 添加默认礼物
	async addDefaultGift(giftName, giftAvatar, price) {
		const result = await this.GiftModel.findOrCreate({
			where: {
				giftName
			},
			defaults: {
        giftName,
				giftAvatar,
				price,
				gift_group_id: 1,
      }
		})
    if (result[result.length - 1]) {
			return { 
				success: true,
				msg: '添加默认礼物成功'
			}
    }
    return {
      success: false,
      msg: '已存在此默认礼物',
    }
	}

  // 获取默认礼物列表
  async getDefaultGiftList() {
    const data = await this.GiftModel.findAll({
			where: {
				gift_group_id: 1
			}
		})

    return { 
      success: true,
      msg: '查询默认礼物列表成功', 
      data
    }
	}

	// 添加主播专属礼物分组
	async addPersonalGift(user_id, giftName, giftAvatar, price) {
		const userData = await this.UserModel.findOne({
			where: {
				id: user_id
			}
		})
		const giftGroupData = await this.GiftGroupModel.findOrCreate({
			where: {
				user_id,
				giftGroupName: {
					$ne: '默认分组'
				}
			},
			defaults: {
				giftGroupName: userData.nickname,
				user_id
			}
		})

		const result = await this.GiftModel.findOrCreate({
			where: {
				giftName
			},
			defaults: {
        giftName,
				giftAvatar,
				price,
				gift_group_id: giftGroupData[0].giftGroupId,
      }
		})
    if (result[result.length - 1]) {
			return { 
				success: true,
				msg: `添加主播${userData.nickname}定制礼物成功`
			}
    }
    return {
      success: false,
      msg: '已存在此礼物',
    }

	}

	// 获取专属礼物列表
	async getPersonalGift() {
		const data = await this.GiftGroupModel.findAll({
			where: {
				giftGroupName: {
					$ne: '默认分组'
				}
			},
			include: [{
				model: this.GiftModel,
				required: false 
      }]
		})

		return { 
      success: true,
      msg: '查询定制礼物列表成功', 
      data
    }
	}

	// 删除礼物
	async deleteGift(giftId) {
    const data = await this.GiftModel.destroy({
      where: {
        giftId
      }
    })
    return {
      success: data !== 0 ? true : false,
      msg: data !== 0 ? '删除成功' : '删除失败',
    }
	}

}

module.exports = GiftService
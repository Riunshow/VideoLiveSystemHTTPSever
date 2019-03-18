'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    const {
      STRING,
      INTEGER,
      DATE,
    } = Sequelize

    // user
    await queryInterface.createTable('user', {
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
        defaultValue: 0,
      },
      balance: {
        type: INTEGER(20),
        allowNull: false,
        defaultValue: 0,
      },
      created_at: DATE,
      updated_at: DATE
    })

    // liveGroup
    await queryInterface.createTable('liveGroup', {
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
        type: STRING(200),
        allowNull: false,
      },
      created_at: DATE,
      updated_at: DATE
    })

    // live
    await queryInterface.createTable('live', {
      roomID: {
        type: INTEGER(10),
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
        type: STRING(100),
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
      },
      token: {
        type: STRING(200),
        allowNull: false,
        defaultValue: '',
      },
      user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      live_group_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'liveGroup',
          key: 'liveGroupId'
        },
      },
      created_at: DATE,
      updated_at: DATE,
    })

    // gift group
    await queryInterface.createTable('giftGroup', {
      giftGroupId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      giftGroupName: {
        type: STRING(100),
        allowNull: false,
      },
      user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE,
    })

    // gift
    await queryInterface.createTable('gift', {
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
      },
      gift_group_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'giftGroup',
          key: 'giftGroupId'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

    // gift record
    await queryInterface.createTable('giftRecord', {
      giftRecordId: {
        type: INTEGER(20),
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      get_gift_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      send_gift_user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      gift_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'gift',
          key: 'giftId'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })


    // statistic
    await queryInterface.createTable('statistic', {
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
      },
      created_at: DATE,
      updated_at: DATE
    })

    // todayVisit
    await queryInterface.createTable('todayVisit', {
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
      created_at: DATE,
      updated_at: DATE
    })

    // todayVisit
    await queryInterface.createTable('liveWanted', {
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
      user_id: {
        type: INTEGER(20),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id'
        },
      },
      created_at: DATE,
      updated_at: DATE
    })

  },




  async down(queryInterface) {
    await queryInterface.dropTable('liveWanted')

    await queryInterface.dropTable('live')
    await queryInterface.dropTable('liveGroup')
    
    await queryInterface.dropTable('giftRecord')
    await queryInterface.dropTable('gift')
    await queryInterface.dropTable('giftGroup')

    await queryInterface.dropTable('user')

    await queryInterface.dropTable('statistic')
    await queryInterface.dropTable('todayVisit')
  },
}
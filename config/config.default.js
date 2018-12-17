'use strict';
// const path = require('path');
module.exports = appInfo => {
  const config = exports = {
    sequelize: {
      dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
      database: 'live_video',
      host: 'localhost',
      port: '3306',
      username: 'root',
      password: '123456',
      timezone: 'Asia/Shanghai',
    },
    io: {
      init: { }, // passed to engine.io
      namespace: {
        '/': {
          connectionMiddleware: [ 'auth' ],
          packetMiddleware: [],
        },
        '/room': {
          connectionMiddleware: [ 'auth' ],
          packetMiddleware: [],
        },
      },
    },
    redis: {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: '123456',
        db: 0,
      },
    },
    security: {
      csrf: {
        enable: false,
      },
    },
    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 24 * 3600 * 1000, // 1 天
      httpOnly: true,
      encrypt: true,
      renew: true,
    },

  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1523509508086_5913';

  // add your config here
  config.middleware = [];

  return config;


};


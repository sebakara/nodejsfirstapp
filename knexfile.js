require("dotenv").config();

module.exports = {
  development:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      port : process.env.dbPort || 3306
    },

  },
  production:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      port : process.env.dbPort || 3306
    }
  },
  testing:{
    client: 'mysql',
    version: '5.7',
    connection: {
      host : process.env.HOST,
      user : process.env.USER,
      password : process.env.PASSWORD,
      database : process.env.DATABASE,
      port : process.env.dbPort || 3306
    }
  }
};
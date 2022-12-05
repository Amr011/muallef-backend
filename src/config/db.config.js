const dotenv = require('dotenv');
dotenv.config();

const developmentConfig = {
   HOST: process.env.HOST,
   USER: process.env.USER,
   PASSWORD: process.env.PASSWORD,
   DB: process.env.DB,
   DIALECT: process.env.DIALECT,
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
   },
};

module.exports = developmentConfig;

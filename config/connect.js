const Sequelize = require('sequelize');
require('dotenv').config();

//connect to db

const sequelize = process.env.JAWSDB_URL
    ? new Sequelize(process.env.JAWSDB_RUL)
    : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PW, {
        host:'localhost',
        dialect:'mysql',
        port:3001
    });

module.exports=sequelize;
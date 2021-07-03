const Sequelize = require('sequelize');

const db = new Sequelize(
    process.env.BDMYSQL,
    process.env.BDUSERMYSQL,
    process.env.BDPASSMYSQL, 
    {
        host: process.env.BDMYSQLSERVER,
        dialect: 'mysql',
        port: 3306,
        define: {
            timestamps: false
        },

        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            indle: 10000
        },

        logging: false,
    }
);

module.exports = db;
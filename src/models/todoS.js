const Sequelize = require('sequelize');
const db = require('../config/dbSql');


const ToDo = db.define('todo', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    descripcion: {
        type: Sequelize.STRING(200),
    },
    hamanecer: {
        type: Sequelize.INTEGER,
    },
    hpuesta: {
        type: Sequelize.INTEGER,
    },
    estado: {
        type: Sequelize.STRING,
    }
});

module.exports = ToDo;
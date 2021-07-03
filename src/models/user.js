const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

const db = require('../config/dbSql');

const Todo = require('./todoS');

const Usuarios = db.define('usuarios', {
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            isEmail: {
                msg: 'Agregar un correo válido'
            },
            notEmpty: {
                msg: 'El email no debe de ir vacio'
            }
        },
        unique: {
            args: true,
            msg: 'Correo ya registrado'
        }
    },
    password:{
        type: Sequelize.STRING(60),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'El password no debe de ir vacio'
            }
        }
    },
}, {
    hooks: {
        beforeCreate(usuario) {
            usuario.password = bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.hasMany(Todo);

module.exports = Usuarios;
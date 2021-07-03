const Users = require('../models/user');

exports.exiteCorreo = async(email = '') => {
    const existe = await Users.findOne({where: {email}});
    if(existe){
        throw new Error(`El correo: ${email} ya esta registrado en el sistema`)
    }
}
const { response, request } = require('express')
const bcryptjs = require('bcryptjs')

const User = require('../models/user')
const { generarJWT } = require('../helpers/jwToken')

exports.create = async(req= request, res = response) => {
    const user = new User(req.body)
    
    try {
        await user.save();
        res.status(201).json({
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno'
        })
    }
}

exports.login = async(req= request, res = response) => {
    const { email, password }= req.body;
    try {
        const user = await User.findOne({
            where: {email}
        });
        if(!user){
            
            return res.status(400).json({
                msg: 'No existe un Usuario'
            })
        } else {
            if(!bcryptjs.compareSync(password, user.dataValues.password)) {
                return res.status(401).json({
                    msg: 'La contraseña no coincide'
                })
            } else {
                const token = await generarJWT(user.dataValues.id)
                res.status(200).json({
                    user, 
                    token
                });
            }
        }

    } catch (error) {
        return res.status(401).json({
            msj: "Credenciales incorrectas"
        })
    }
}
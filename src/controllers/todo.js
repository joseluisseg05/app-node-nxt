const { response, request } = require('express')

const ToDoS = require('../models/todoS')
const ToDoM = require('../models/todoM');

exports.create = async(req = request, res= response) => {
    const todo = new ToDoS(req.body);
    todo.usuarioId = req.user
    try {
        await todo.save()
        res.status(201).json(todo)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno de DB'
        })
    }
}

exports.listar = async(req= request, res= response) => {
    
    try {
        
        const todo = await ToDoS.findAll({
            where: { usuarioId: req.user}
        }) 
        
        res.status(200).json({todo})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno de DB'
        })
    }
}

exports.eliminar = async(req= request, res= response) => {
    const id = req.params.id
    
    try {
        const data = await ToDoS.findOne({
            where: {id}
        })
        if(data){
            data.dataValues.estado = "Abortado"
            data.dataValues.usuarioId = req.user;

            const datamongo = new ToDoM(data.dataValues);

            await ToDoS.destroy({
                where: { id }
            })
            await datamongo.save();

            const todo = await ToDoS.findAll({
                where: { usuarioId: req.user}
            }) 

            res.status(200).json({todo})
        } else {
            res.status(400).json({
                msg: 'No existe data'
            })
        }
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Error Interno de DB'
        })
    }
}

exports.abortados = async( req= request,res= response) => {
    try {
        const todo = await ToDoM.find({ usuarioId: req.user}) 
        
        res.status(200).json({todo})
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: "Error interno de db"
        })
    }
}
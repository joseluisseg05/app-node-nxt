const { Schema, model } = require('mongoose');

const ToDoSchema = Schema({
    titulo: {
        type: String,
        require: [true, 'El titulo es un campo requerido'],
        required: true
    },
    descripcion: {
        type: String,
        require: [true, 'La descripcion es un campo requerido']
    },
    hamanecer: {
        type: Number,
    },
    hpuesta: {
        type: Number,
    },
    estado: {
        type: String,
    },
    usuarioId: {
        type: Number,
        require: true
    }
});

ToDoSchema.methods.toJSON = function () {
    const {__v, _id, ...data} = this.toObject(); 
    data.id = _id;
    return data;
}

module.exports = model('ToDo', ToDoSchema);

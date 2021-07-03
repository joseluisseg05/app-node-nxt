const { Router } = require('express')
const { check } = require('express-validator')

const todo = require('../controllers/todo')
const { validarCampos } = require('../middlewares/validar_campos')
const { valiarJWT } = require('../helpers/jwToken')

const router = Router()

router.get('/', [
    valiarJWT,
    validarCampos
], todo.listar)

router.post('/', [
    valiarJWT,
    check('titulo', 'El titulo es un campo obligatorio').notEmpty(),
    validarCampos
], todo.create)

router.delete('/:id', [valiarJWT, validarCampos],  todo.eliminar)

router.get('/abortados', [
    valiarJWT,
    validarCampos
], todo.abortados)

module.exports = router;
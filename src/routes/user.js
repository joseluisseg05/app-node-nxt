const { Router } = require('express')
const { check } = require('express-validator')

const user = require('../controllers/user')
const { validarCampos } = require('../middlewares/validar_campos')
const { exiteCorreo } = require('../helpers/db_validar')

const router = Router()

router.post('/', [
    check('email', 'El correo no es valido').notEmpty().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria, min 6 caracteres').isLength({min:6}),
    check('email').custom(exiteCorreo),
    validarCampos
],user.create)

router.post('/login', [
    check('email', 'El correo no es valido').notEmpty().isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria, min 6 caracteres').isLength({min:6}),
    validarCampos
], user.login)

module.exports = router;

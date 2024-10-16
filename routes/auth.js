/*
    Rutas de Usuarios  /api/auth

    get host + /api/auth/
    post  /api/auth/new
    
*/


const {Router} = require('express');
const{check} = require ('express-validator')
const {crearUsuario, loginUsuario,renewToken} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


const router = Router();

router.post('/',[
    //middlewares
    check('email', ' El email es obligaroroio').isEmail(),
    check('password', ' El password debe ser de 6 o mas caracteres').isLength({min:6}),
    validarCampos

],loginUsuario);

router.post('/new',[
    //middlewares

    check('name', ' el nombre es obligatorio').not().isEmpty(),
    check('email', ' El email es obligaroroio').isEmail(),
    check('password', ' El password debe ser de 6 o mas caracteres').isLength({min:6}),
    validarCampos
],crearUsuario );
router.get('/renewtoken',validarJWT,renewToken );



module.exports =  router;

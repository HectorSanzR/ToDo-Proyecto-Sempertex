/* aqui se crea el CRUD para unir con el frontend

    ruta = /api/tareas
 
*/



const {Router} = require('express');
const{check} = require ('express-validator')
const {validarJWT} = require('../middlewares/validar-jwt');
const {crearTarea, getTarea,actualizarTarea,eliminarTarea} = require('../controllers/tareas');

const {validarCampos} = require('../middlewares/validar-campos')
const {isDate} = require('../helpers/isDate')

const router = Router();


//validamos token para todos los endpoint
router.use(validarJWT)

//obtener tarea
router.get('/',getTarea)

//Crear tarea
router.post(
    '/',
    [
        check('title','Titulo obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom(isDate),
        check('end','Fecha de finalizacion es obligatoria').custom(isDate),
        check('status','Fecha de inicio es obligatoria').not().isEmpty(),
        check('priority','Fecha de inicio es obligatoria').not().isEmpty(),
        validarCampos,
    ],
    crearTarea)

//Actualizar tarea
router.put('/:id',[
    check('title','Titulo obligatorio').not().isEmpty(),
    check('start','Fecha de inicio es obligatoria').custom(isDate),
    check('end','Fecha de finalizacion es obligatoria').custom(isDate),
    check('status','Fecha de inicio es obligatoria').not().isEmpty(),
    check('priority','Fecha de inicio es obligatoria').not().isEmpty(),
    validarCampos,
],actualizarTarea)

//Eliminar tarea
router.delete('/:id',eliminarTarea)


module.exports = router;
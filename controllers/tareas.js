const {response} = require ('express')
const Tarea = require('../models/tareas')


const crearTarea = async(req,res = response) =>{
    
const tarea = new Tarea(req.body)
try {

    tarea.user = req.uid;

    const tareaGuardada = await tarea.save()
    res.status(201).json({
        
        ok:true,
        tarea : tareaGuardada,
        
        
    })
} catch (error) {
    console.log(error)
    res.status(500).json({
        
        ok:false,
        msg:'Hable con el administrador de crear tarea'
        
    })
}
       
}

const getTarea = async (req,res = response) => {

    const tareas = await Tarea.find()
                                .populate('user','name isAdmin')

        res.json({

            ok:true,
            tareas
        
        }
)   
    }

 


const actualizarTarea = async(req,res = response) =>{

    const tareaId = req.params.id;
    const uid = req.uid;

try {
    const tarea = await Tarea.findById(tareaId)
   
    

    // const evento
    if (!tarea){
        return res.status(404).json({
            msg:'Tarea no existe por ese id'

        })
    }

    if(tarea.user.toString() !==uid){
        return res.status(404).json({
            ok:false,
            msg:'No tiene privilegios para editar la tarea'
        })
    }

    const nuevaTarea= {
        ...req.body,
        user:uid
    }

    const tareaActualizada = await Tarea.findByIdAndUpdate(tareaId,nuevaTarea, {new: true })

    res.json({
        ok:true,
        tarea:tareaActualizada
    });
    
} catch (error) {
    console.log(error)
    res.status(500).json({
       ok:false,
       msg: 'hable con el administrador' 
    })
    
}
   
   
}


const eliminarTarea =async (req,res = response) =>{

    const tareaId = req.params.id;
    const uid = req.uid;

try {
    const tarea = await Tarea.findById(tareaId)
   
    

    // const evento
    if (!tarea){
        return res.status(404).json({
            msg:'Tarea no existe por ese id'

        })
    }

    if(tarea.user.toString() !==uid){
        return res.status(404).json({
            ok:false,
            msg:'No tiene privilegios para eliminar la tarea'
        })
    }



    await Tarea.findByIdAndDelete(tareaId)

    res.json({
        ok:true,
    });
    
} catch (error) {
    console.log(error)
    res.status(500).json({
       ok:false,
       msg: 'hable con el administrador' 
    })
    
}
  



}

module.exports = {
    getTarea,
    crearTarea,
    actualizarTarea,
    eliminarTarea
}



const {response} = require ('express')
const bcrypt = require ('bcryptjs')
const Usuario = require ('../models/Usuario')
const { generarlJWT} = require('../helpers/jtw');

// esta es la ap que controla la creacion de usuario
const crearUsuario = async (req,res = response) =>{

    //mediante el body creado en la req se asigan los valores
    const {email,password,isAdmin}= req.body;

try {
    
    //realizamos la busqueda de un usuario con correo electronico igual
    let usuario = await Usuario.findOne({email})
    //validamos que exista el usuario y pasamos un mensaje
    if (usuario){
      return  res.status(400).json({
            ok:false,
            msg:'El correo ya existe'
        })
    }

    usuario = new Usuario(req.body);
    // encriptar pass
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password,salt)

    await usuario.save();
      // generar JWT

      const token = await generarlJWT(usuario.id,usuario.name,usuario.isAdmin);

    res.status(201).json({
        ok:true,
        uid: usuario.id,
        name: usuario.name,
        isAdmin: usuario.isAdmin,
        token
       
   })
} catch (error) {
    res.status(500).json({
        ok:false,
       msg:'Por favor hable con el administrador sobre la creacion de usuario',
    })
}
}

const loginUsuario = async (req,res = response) =>{
     

 const {email,password}= req.body;

 
 try {
     let usuario = await Usuario.findOne({email})

     if (!usuario){
        return res.status(400).json({
            ok:false,
            msg:'El usuario no existe ',
        })
    }
        //confirmar passwords
        const validPassword = bcrypt.compareSync(password, usuario.password)
        
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Password incorrecto',
            })

        }

        // generar JWT
        const token = await generarlJWT(usuario.id,usuario.name) 


        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
     
 } catch (error) {
    res.status(500).json({
        ok:false,
        msg:'Contacte al administrador sobre el Login',
    })
    
 }
   
}


const renewToken = async  (req,res = response) =>{
    const {uid,name}=req;

    const token = await generarlJWT(uid,name) 
    res.json({
        
        token,uid,name,
        ok:true,
        msg:'Renew'
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    renewToken,
}
//estoy regresando una promesa el payload son los uid name que mandamos a guardar como pyload luego hacempos la firma del payload luego la firma secrea, la duracion y error por si no se resuelve y resolve token

//

const jwt = require('jsonwebtoken')

const generarlJWT = (uid,name) =>{


return new Promise((resolve,reject)=>{

    const payload = {uid,name};


    jwt.sign(payload,process.env.SECRET_JWT_SEED,{
        expiresIn:'2h'
    },(err,token)=>{

        if(err){
            console.log(err)
            reject('No se puedo generar el token')
        }
        resolve(token)

    })

    })


}


module.exports ={generarlJWT}
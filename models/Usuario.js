const {model,Schema} = require('mongoose')

//creando el schema del usuario
const UsuarioSchema = Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true

},
isAdmin:
{
    type: Boolean,
    // required:true
}


});

module.exports=model('Usuario',UsuarioSchema);



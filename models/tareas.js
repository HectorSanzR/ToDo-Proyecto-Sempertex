const {model,Schema} = require('mongoose')


//creando el schema de la tarea
const TareaSchema = Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required:true

    },
    title:{
        type:String,
        required:true,
        
    },
    start:{
        type:Date,
        required:true,
        
    },
    end:{
        type:Date,
        required:true,
        
    },
    status:{
        type:String,
        required:true,
        
    },
    priority:{
        type:String,
        required:true,
        
    },
    notes:{
        type:String,
        
    }
 


});

TareaSchema.method('toJSON',function(){
   const {__v,_id,...object } = this.toObject();
   
   object.id = _id;
//    object.admin = user.isAdmin
   
   return object;
})

module.exports=model('Tarea',TareaSchema);


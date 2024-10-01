const express = require('express');
const path = require('path');
const { dbConnection } = require('./database/config');
const cors = require('cors');
require('dotenv').config();



// crear el Servidor de express
const app = express();

//conexcion a base de datos
dbConnection();

app.use(cors())

//Directorio Publico
app.use(express.static('public'));



//Lectura y parseo del body
app.use(express.json());

// //rutas
        //rutas para la autenticacion crear, login, renew
        // aqui esta el path para ver por postman es el primero
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/tareas', require('./routes/tareas'));

app.use('*',(req,res)=>{
        res.sendFile(path.join(__dirname,'public/index.html'))
})
// crud: eventos


// Escuchar peticiones 
app.listen(process.env.PORT, () =>{

})

const express = require('express');
const conectarDB = require('./config/db');
const cors= require('cors');

//Creando el servidor
const app = express();

//conectar ala base datos 
conectarDB();

//Hablitar cors
app.use(cors());

//Habilitar express.json
app.use(express.json({ extended: true}));

//Puerto de la app
const port = process.env.port || 4000;

//Rutas
app.use('/api/usuarios',require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));

//Ejecutnado la app
app.listen(port,'0.0.0.0', () =>{
   console.log(`Server Listening en el puerto ${PORT}`);
})
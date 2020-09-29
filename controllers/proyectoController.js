const Proyecto  = require('../models/Proyecto');
const {validationResult} = require('express-validator');

exports.crearProyecto = async (req, res) =>{

   //Revisar si hay errores 
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores:errores.array()})
   }
   //==========================================================
   //                   Creacion de proyecto
   //----------------------------------------------------------
   try {
      //crear un nuevo proyecto 
      const proyecto = new Proyecto(req.body);
      //Guardar el creador por jwt
      proyecto.creador = req.usuario.id;
      //Guardar
      proyecto.save();
      res.json(proyecto);
      
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error en el controller proyecto Metod:Guardar')
   }

}

//Obtiene todos los proyectos del usuario actual
exports.obtenerProyectos =  async (req, res) =>{
   try {
      const proyectos = await Proyecto.find({creador: req.usuario.id}).sort({creado:-1});
      res.json({proyectos});
   } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error en el Proyecto Controller Metod:Mostrar');
   }
}

//Actualiza un proyecto 
exports.actualizarProyecto = async(req,res) =>{
   //Revisar si hay errores 
   const errores = validationResult(req);
   if(!errores.isEmpty()){
      return res.status(400).json({errores:errores.array()})
   }

   //Extraer la informacion del proyecto
   const {nombre} = req.body;
   const nuevoProyecto = {};
   if(!nombre){
      nuevoProyecto.nombre = nombre;
   }

   try {
      //Revisar el ID
      let proyecto = await Proyecto.findById(req.params.id);

      //Revisar que exista el proyecto 
      if(!proyecto){
         return res.status(404).json({msg: 'Proyecto no encontrado'})
      }
      
      //Verificar el creador del proyecto 
      if(proyecto.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg:'Accesso denegado no tienes permisos suficientes'})
      }

      //Actualizar 
      proyecto = await Proyecto.findByAndUpdate({_id: req.params.id},{$set: nuevoProyecto},{new: true});
      res.json({proyecto});
   } catch (error) {
      console.log(error);
      res.status(500).send('Error en Proyecto Controller Metod:Actualizar')
      
   }
}

exports.eliminarProyecto = async (req, res) => {
   try {
      //Revisar el ID
      let proyecto = await Proyecto.findById(req.params.id);

      //Revisar que exista el proyecto 
      if(!proyecto){
         return res.status(404).json({msg: 'Proyecto no encontrado'})
      }
      
      //Verificar el creador del proyecto 
      if(proyecto.creador.toString() !== req.usuario.id){
         return res.status(401).json({msg:'Accesso denegado no tienes permisos suficientes'})
      }
      //Eliminar el prouyecto 
      await Proyecto.findOneAndRemove({_id:req.params.id});
      res.json({msg: 'Proyecto Eliminado '});
   } catch (error) {
      console.log(error);
      res.status(500).send('Error en el Proyecto controller metod: Delete');
   }
}
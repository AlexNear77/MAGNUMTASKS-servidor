const express = require('express');
const router = express.Router();
const proyectoController =  require('../controllers/proyectoController');
const auth = require('../middleware/auth');
const {check} = require('express-validator');

//Crear proyectos
// api/proyectos
router.post('/', 
   auth,
   [
      check('nombre','El nombre del proyecto es obligatorio').not().isEmpty()
   ],
   proyectoController.crearProyecto
)
//Obtener los proyectos
router.get('/', 
   auth,
   proyectoController.obtenerProyectos
)
//Actualizar proyectos  
router.put('/:id',
   auth,
   [
     check('nombre','El nombre del proyecto es obligatorio').not().isEmpty() 
   ],
   proyectoController.actualizarProyecto
);
//Eliminar Proyecto 
router.delete('/:id',
   auth,
   proyectoController.eliminarProyecto
);

module.exports = router;
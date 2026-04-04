const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const { verificarToken } = require('../middleware/autHMiddleware');
const { autorizarRoles } = require('../middleware/rolMiddleware');


router.get('/tareas', verificarToken, tareaController.getTareas);

// Solo los administradores pueden eliminar tareas
router.delete('/tareas/:id', verificarToken, autorizarRoles('admin'), tareaController.deleteTarea);

// Solo los administradores pueden crear tareas
router.post('/tareas', verificarToken, autorizarRoles('admin'), tareaController.createTarea)
module.exports = router;
const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');

router.get('/tareas', tareaController.getTareas);

module.exports = router;
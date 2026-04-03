const express = require('express');
const router = express.Router();
const tareaController = require('../controller/tareaController');
const { verificarToken } = require('../services/authsServices');


router.get('/tareas', verificarToken, tareaController.getTareas);

module.exports = router;
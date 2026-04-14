const express = require('express');
const router = express.Router();
const libroController = require('../controllers/libroController');
const authMiddleware = require('../middleware/authMiddleware');

/**
 * Solo los usuarios autenticados pueden ver y gestionar libros.
 */

// Listar todos los libros (Protegido)
router.get('/', authMiddleware, libroController.listarLibros);

// Agregar un libro (Protegido, útil para cargar manual)
router.post('/', authMiddleware, libroController.agregarLibro);

module.exports = router;

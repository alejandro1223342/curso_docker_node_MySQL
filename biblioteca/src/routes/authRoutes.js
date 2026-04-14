const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Registro de usuario
router.post('/register', authController.registrar);

// Inicio de sesión
router.post('/login', authController.login);

// Cierre de sesión (Protegido)
router.post('/logout', authMiddleware, authController.logout);

module.exports = router;

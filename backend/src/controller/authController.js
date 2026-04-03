const authService = require('../services/authsServices');

/**
 * Registra un nuevo usuario
 */
async function registrar(req, res) {
    try {
        const usuario = await authService.registrarUsuario(req.body);
        res.status(201).json({ message: "Usuario registrado con éxito", data: usuario });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

/**
 * Autentica un usuario y devuelve el token
 */
async function login(req, res) {
    try {
        const token = await authService.loginUsuario(req.body);
        res.json({ message: "Login exitoso", token: token });
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
}

module.exports = {
    registrar,
    login
};
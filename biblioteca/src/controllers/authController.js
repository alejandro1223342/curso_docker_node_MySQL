const authService = require('../services/authsServices');

/**
 * Registra un usuario.
 */
async function registrar(req, res) {
    try {
        const usuario = await authService.registrarUsuario(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Usuario registrado con éxito',
            data: { id: usuario.id, email: usuario.email }
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Inicia sesión y devuelve el token.
 */
async function login(req, res) {
    try {
        const token = await authService.loginUsuario(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Login exitoso',
            token
        });
    } catch (error) {
        res.status(401).json({
            status: 'error',
            message: error.message
        });
    }
}

/**
 * Cierra la sesión (logout) revocando el token.
 */
async function logout(req, res) {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader ? authHeader.split(' ')[1] : null;

        await authService.logoutUsuario(token);

        res.status(200).json({
            status: 'success',
            message: 'Logout exitoso'
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = {
    registrar,
    login,
    logout
};

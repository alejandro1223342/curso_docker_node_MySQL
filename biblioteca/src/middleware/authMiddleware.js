const jwt = require('jsonwebtoken');
const tokenRevocadoRepo = require('../repositories/tokenRevocadoRepository');

const jwtSecret = process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto';

/**
 * Middleware para validar el token JWT y verificar si está revocado.
 */
async function validarToken(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        // Verificar si el token está en la lista negra
        const esRevocado = await tokenRevocadoRepo.isTokenRevoked(token);
        if (esRevocado) {
            return res.status(401).json({ message: 'Sesión expirada. Por favor, inicie sesión de nuevo.' });
        }

        // Verificar el token con JWT
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; // Adjuntar datos del usuario a la petición
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado.' });
    }
}

module.exports = validarToken;

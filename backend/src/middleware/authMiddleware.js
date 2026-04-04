const jwt = require('jsonwebtoken');
const blackListRepo = require('../repositories/tokenBlackListRepositorie');
const secretKey = process.env.JWT_SECRET;

/**
 * Middleware para verificar el token JWT y comprobar si está en la lista negra (Logout)
 */
async function verificarToken(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }
    
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    try {
        // 1. Verificar si el token ha sido revocado (Blacklist)
        const revocado = await blackListRepo.estaRevocado(token);
        if (revocado) {
            return res.status(401).json({ message: 'Token revocado. Por favor, inicia sesión de nuevo.' });
        }

        // 2. Verificar la validez del token (Expiración y firma)
        const decoded = jwt.verify(token, secretKey);
        
        // Guardamos los datos del usuario en el request para uso posterior
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token inválido o expirado' });
    }
}

module.exports = {
    verificarToken
};
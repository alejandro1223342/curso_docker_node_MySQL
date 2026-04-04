const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userRepository = require('../repositories/userRepository');

const saltRounds = 10;
const secretKey = process.env.JWT_SECRET;

/**
 * Registra un nuevo usuario hasheando la contraseña
 */
async function registrarUsuario(data) {
    const usuarioExistente = await userRepository.obtenerPorEmail(data.email);
    if (usuarioExistente) {
        throw new Error('El usuario ya existe');
    }
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    const user = await userRepository.crearUser({
        ...data, 
        password: hashedPassword, 
        rol: data.rol 
    });
    return user;
}

/**
 * Autentica un usuario y genera un token JWT
 */
async function loginUsuario(data) {
    const usuario = await userRepository.obtenerPorEmail(data.email);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    
    const passwordCorrecto = await bcrypt.compare(data.password, usuario.password);
    if (!passwordCorrecto) {
        throw new Error('Contraseña incorrecta');
    }
   
    const payload = {
        userId: usuario.id,
        email: usuario.email,
        rol: usuario.rol
    };
    
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    return token;
}

/**
 * Middleware para verificar el token JWT
 */


module.exports = {
    registrarUsuario,
    loginUsuario,
};

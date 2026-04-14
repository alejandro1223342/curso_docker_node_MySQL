const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const usuarioRepo = require('../repositories/usuarioRepository');
const tokenRevocadoRepo = require('../repositories/tokenRevocadoRepository');

const jwtSecret = process.env.JWT_SECRET || 'mi_clave_secreta_por_defecto';

/**
 * Registra un nuevo usuario en la biblioteca.
 */
async function registrarUsuario(data) {
    const { email, password } = data;

    // Verificar si ya existe el usuario
    const existente = await usuarioRepo.findByEmail(email);
    if (existente) throw new Error('El correo electrónico ya está registrado.');

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    return await usuarioRepo.createUsuario({
        email,
        password: hashedPassword
    });
}

/**
 * Autentica un usuario y genera un JWT.
 */
async function loginUsuario(data) {
    const { email, password } = data;

    // Buscar usuario
    const usuario = await usuarioRepo.findByEmail(email);
    if (!usuario) throw new Error('Credenciales inválidas.');

    // Verificar contraseña
    const passwordMatch = await bcrypt.compare(password, usuario.password);
    if (!passwordMatch) throw new Error('Credenciales inválidas.');

    // Generar Token
    const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        jwtSecret,
        { expiresIn: '1h' }
    );

    return token;
}

/**
 * Revoca un token para cerrar la sesión.
 */
async function logoutUsuario(token) {
    if (!token) throw new Error('Token no proporcionado.');
    await tokenRevocadoRepo.addToken(token);
}

module.exports = {
    registrarUsuario,
    loginUsuario,
    logoutUsuario
};

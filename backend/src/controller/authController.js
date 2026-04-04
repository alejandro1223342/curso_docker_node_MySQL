const authService = require('../services/authsServices');
const blackListRepo = require('../repositories/tokenBlackListRepositorie');

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


async function logout(req, res) {
   
   const authHeader = req.headers.authorization;
   if (!authHeader) return res.status(401).json({ message: 'Token no proporcionado' });
   const token = authHeader.split(' ')[1];

   if(!token) return res.status(401).json({ message: 'Token no proporcionado' });
   await blackListRepo.agregarToken(token);
   
return res.status(200).json({ message: "Logout exitoso" });
   
   
}

module.exports = {
    registrar,
    login,
    logout
};
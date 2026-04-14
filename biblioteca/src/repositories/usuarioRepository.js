const prisma = require('../lib/prisma');

/**
 * Busca un usuario por su email.
 */
async function findByEmail(email) {
    return await prisma.usuario.findUnique({
        where: { email }
    });
}

/**
 * Crea un nuevo usuario en la base de datos.
 */
async function createUsuario(data) {
    return await prisma.usuario.create({
        data
    });
}

module.exports = {
    findByEmail,
    createUsuario
};

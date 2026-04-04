const prisma = require('../lib/prisma');

/**
 * Agrega un token a la lista negra (revocado)
 */
async function agregarToken(token) {
    return await prisma.tokenRevocado.create({
        data: {
            token: token
        }
    });
}

/**
 * Verifica si un token ya ha sido revocado
 */
async function estaRevocado(token) {
    const registro = await prisma.tokenRevocado.findUnique({
        where: {
            token: token
        }
    });
    return !!registro;
}

module.exports = {
    agregarToken,
    estaRevocado
};
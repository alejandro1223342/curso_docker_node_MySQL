const prisma = require('../lib/prisma');

/**
 * Agrega un token a la lista negra.
 */
async function addToken(token) {
    return await prisma.tokenRevocado.create({
        data: { token }
    });
}

/**
 * Verifica si un token ya ha sido revocado.
 */
async function isTokenRevoked(token) {
    const registro = await prisma.tokenRevocado.findUnique({
        where: { token }
    });
    return !!registro;
}

module.exports = {
    addToken,
    isTokenRevoked
};

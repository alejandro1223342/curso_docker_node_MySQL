const prisma = require('../lib/prisma');

async function crearUser(data) {
    return await prisma.usuario.create({
        data
    })
}

//Obtiene un usuario por email
async function obtenerPorEmail(email) {
    return await prisma.usuario.findUnique({where: {email}})
}

//Exporta las funciones
module.exports = {
    crearUser,
    obtenerPorEmail
}
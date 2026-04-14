const prisma = require('../lib/prisma');

/**
 * Obtiene todos los libros de la base de datos.
 */
async function findAllLibros() {
    return await prisma.libro.findMany();
}

/**
 * Crea un nuevo libro (útil si se desea añadir funcionalidad de carga).
 */
async function createLibro(data) {
    return await prisma.libro.create({
        data
    });
}

module.exports = {
    findAllLibros,
    createLibro
};

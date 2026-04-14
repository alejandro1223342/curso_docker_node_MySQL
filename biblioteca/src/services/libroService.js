const libroRepo = require('../repositories/libroRepository');

/**
 * Obtiene todos los libros disponibles.
 */
async function obtenerTodos() {
    return await libroRepo.findAllLibros();
}

/**
 * Agrega un libro a la base de datos (se puede usar para admin o carga inicial).
 */
async function agregarLibro(data) {
    return await libroRepo.createLibro(data);
}

module.exports = {
    obtenerTodos,
    agregarLibro
};

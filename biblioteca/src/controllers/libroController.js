const libroService = require('../services/libroService');

/**
 * Lista todos los libros de la biblioteca.
 */
async function listarLibros(req, res) {
    try {
        const libros = await libroService.obtenerTodos();
        res.status(200).json({
            status: 'success',
            count: libros.length,
            data: libros
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Error al obtener los libros'
        });
    }
}

/**
 * Agrega un libro (opcional, para conveniencia).
 */
async function agregarLibro(req, res) {
    try {
        const libro = await libroService.agregarLibro(req.body);
        res.status(201).json({
            status: 'success',
            message: 'Libro agregado con éxito',
            data: libro
        });
    } catch (error) {
        res.status(400).json({
            status: 'error',
            message: error.message
        });
    }
}

module.exports = {
    listarLibros,
    agregarLibro
};

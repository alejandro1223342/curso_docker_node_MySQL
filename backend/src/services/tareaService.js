const tareaRepository = require('../repositories/tareaRepository');

async function getTareas() {
    return await tareaRepository.getTareas();
}

async function deleteTarea(id) {
    return await tareaRepository.deleteTarea(id);
}

async function createTarea(data, usuarioId) {
    return await tareaRepository.createTarea(data, usuarioId);
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};
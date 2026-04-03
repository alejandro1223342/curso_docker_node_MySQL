const tareaRepository = require('../repositories/tareaRepository');

async function getTareas() {
    return await tareaRepository.getTareas();
}

module.exports = {
    getTareas
};
const prisma = require('../lib/prisma');

async function getTareas() {
    return await prisma.tarea.findMany();
}

async function deleteTarea(id) {
    return await prisma.tarea.delete({
        where: {
            id: id
        }
    });
}

async function createTarea(data, usuarioId) {
    return await prisma.tarea.create({
        data: {
            ...data,
            usuarioId: usuarioId
        }
    });
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};

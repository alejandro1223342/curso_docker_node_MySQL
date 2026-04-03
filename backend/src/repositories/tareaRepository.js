const prisma = require('../lib/prisma');

async function getTareas() {
    return await prisma.tarea.findMany();
}

module.exports = {
    getTareas
};

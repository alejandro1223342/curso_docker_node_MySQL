const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// Inicializar el adaptador usando la variable que viene de Docker o del .env
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

async function getTareas() {
    return await prisma.tarea.findMany();
}

module.exports = { getTareas };

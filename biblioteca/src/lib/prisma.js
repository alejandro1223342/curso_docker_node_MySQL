const { PrismaClient } = require('@prisma/client');
const { PrismaMariaDb } = require('@prisma/adapter-mariadb');

// En Prisma 7 con Driver Adapters, inicializamos el adaptador con la URL
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { apiReference } = require('@scalar/express-api-reference');

// Importar Rutas
const authRoutes = require('./routes/authRoutes');
const libroRoutes = require('./routes/libroRoutes');

const app = express();
const port = process.env.PORT || 3000;

// Configuración de CORS
const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middlewares Globales
app.use(cors(corsOptions));
app.use(express.json());

// Ruta de Prueba
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de la Biblioteca Digital' });
});

// Registrar Rutas
app.use('/api', authRoutes);
app.use('/api', libroRoutes);

// Documentación de Scalar
app.use('/docs', apiReference({
    theme: 'dark',
    layout: 'modern',
    spec: {
        url: '/api/openapi.yaml'
    },
    configuration: {
        showSidebar: true,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: 'token'
        }
    }
}));

// Servir archivo OpenAPI
app.get('/api/openapi.yaml', (req, res) => {
    res.set('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '../docs/openapi.yaml'));
});

// Iniciar Servidor
app.listen(port, () => {
    console.log(` Servidor de la Biblioteca escuchando en http://localhost:${port}`);
    console.log(` Documentación disponible en http://localhost:${port}/docs`);
});

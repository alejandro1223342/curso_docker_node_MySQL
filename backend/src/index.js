require('dotenv').config();
const tareasRoutes = require('./routes/tareasRoutes'); //importamos las rutas
const authRoutes = require('./routes/authRoutes');
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

const { apiReference } = require('@scalar/express-api-reference');

const cors = require('cors');

const corsOptions = {
    origin: 'http://localhost:3000' || process.env.CORS_ORIGIN, // o el puerto donde corre tu frontend
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));
app.use(express.json());
console.log("clave", jwtSecret);
console.log("puerto", port);


app.get('/', (req, res) => {
    res.send('Api de backend funcionando');
});

app.use('/api', tareasRoutes); //aca se conecta con el archivo tareasRoutes.js
app.use('/api', authRoutes);//aca se conecta con el archivo authRoutes.js

app.use('/docs', apiReference({
    theme: 'dark',
    layout: 'modern',
    spec: {
        url: '/api/openapi.yaml'
    },
    configuration: {
        showSidebar: true,
        hideDownloadButton: false,
        hideTryItPanel: false,
        authentication: {
            preferredSecurityScheme: 'bearerAuth',
            apiKey: 'token' 
        }
    }
}));

app.get('/api/openapi.yaml', (req, res) => {
    res.set('Content-Type', 'application/x-yaml');
    res.sendFile(path.join(__dirname, '../docs/openapi.yaml'));
});

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    console.log(`Documentación disponible en http://localhost:${port}/docs`);
});


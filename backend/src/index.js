require('dotenv').config();
const tareasRoutes = require('./routes/tareasRoutes'); //importamos las rutas

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

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

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
});

//para que funcione el cors en docker se debe agregar la variable CORS_ORIGIN en el archivo .env
//backend: http://localhost:3000
//frontend: http://localhost:5173
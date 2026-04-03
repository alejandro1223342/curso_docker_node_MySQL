require('dotenv').config();
const tareasRoutes = require('./routes/tareasRoutes'); //importamos las rutas

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

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
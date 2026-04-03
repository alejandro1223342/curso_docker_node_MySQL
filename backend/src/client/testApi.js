const axios = require('axios');

async function testGetTareas() {
    try {
        const response = await axios.get('http://localhost:3000/api/tareas');
        console.log(response.data);
    } catch (error) {
        console.error(error);
    }
}

testGetTareas();
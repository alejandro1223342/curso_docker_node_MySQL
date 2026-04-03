const tareaService = require('../services/tareaService');

async function getTareas(req, res) {
    try {
        const tareas = await tareaService.getTareas();
        console.log(tareas);
        res.status(200).json({ message: "Tareas obtenidas correctamente", data: tareas });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
async function deleteTarea(req, res) {
    try {
        const id = Number(req.params.id);
        const tarea = await tareaService.deleteTarea(id);
        res.status(200).json({ message: "Tarea eliminada correctamente", data: tarea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getTareas,
    deleteTarea,
    createTarea
};

async function createTarea(req, res) {
    try {
        const { userId } = req.user;
        const tarea = await tareaService.createTarea(req.body, userId);
        res.status(200).json({ message: "Tarea creada correctamente", data: tarea });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
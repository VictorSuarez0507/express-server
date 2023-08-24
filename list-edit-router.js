const express = require("express");
const {Task, tasksList, addTask, completeTask, deleteTask, } = require("./tasksFunction");
const router = express.Router();

router.post('/', (req, res) => {
    const {id, description} = req.body;
    if (!id || isNaN(id) || !description) {
        return res.status(400).json({ error: "Se debe registrar un ID númerico y una description de la tarea" });
    }
    const task = new Task(id, description, false) 
    addTask(task)
    res.json({ mensaje: "Tarea agregada con éxito" });
});

router.delete("/:id", (req, res) => {
    const id = req.params.id; 
    const task = tasksList.find((task) => task.id === id)
    if (task) {
        deleteTask(id);  
        return res.json({ mensaje: "Se elimino la tarea correctamente" });
    }
    res.status(404).json({ error: "No se encuentra la tarea indicada"});  
});

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const task = tasksList.find((task) => task.id === id);
    if (task) {
        completeTask(id); 
        return res.json({ mensaje: "Se completo la tarea" });
    }
    res.status(404).json({ error: "No es posible completar la tarea" });
});

module.exports = router;
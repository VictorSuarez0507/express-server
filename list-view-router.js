const express = require("express");
const router = express.Router();
const {tasksList, showTasks} = require("./tasksFunction")


router.get("/", (_req, res) => {
    res.json(showTasks());
})

router.get("/completed", (req, res) => {   
    const completedTasks = [...tasksList].filter(task => task.completed); 
    if (completedTasks.length === 0) {
        res.status(404).json({error: "No tienes tareas completadas"});
    } else {
        res.json(completedTasks);
    }
});

router.get("/incompleted",(req, res) => {
    const incompletedTasks = [...tasksList].filter(task => !task.completed); 
    if (incompletedTasks.length === 0) {
        res.status(404).json({error: "No tienes tareas pendientes de completar"});
    } else {
        res.json(incompletedTasks);
    }
});
router.get("/:id", (req, res) => {
    const id = req.params.id
    if (isNaN(id)) {
        res.status(404).json({error: "Debe ingresar una ID númerico para visualizar la tarea solicitada"})
    }
    const data = [...tasksList].filter(task => id === task.id)
    if (data.length !== 0) {
        res.status(404).json(data);
    } else {
        
        res.status(404).json({error: `No existe tarea registrada con el ID ${id} indicado`});
    }
})

module.exports = router;

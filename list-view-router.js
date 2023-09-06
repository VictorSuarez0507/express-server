const express = require("express");
const router = express.Router();
const {tasksList, showTasks} = require("./tasksFunction")

function validateViewRouter(req, res, next) {
    if (req.path !== '/' && req.path !== '/completed' && req.path !== '/incompleted'  ) {
      return res.status(400).json({ error: 'La ruta debe ser completed o incompleted ' });
    }
    next();
}

router.use(validateViewRouter);

router.get("/", (req, res) => {
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

module.exports = router;

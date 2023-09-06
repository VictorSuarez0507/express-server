class Task {
    constructor(id, description, completed) {
        this.id = id;
        this.description = description;
        this.completed = completed;
    }
}

const tasksList = [];

function addTask(task) {
    tasksList.push(task); 
}

function completeTask (id) {
    const task = tasksList.find((task) => task.id === id);
    if (task) {
        task.completed = true;
    }
}

function deleteTask (id) {
    const task = tasksList.findIndex((task) => task.id === id);
    if (task !== -1) {
        tasksList.splice(task, 1);
    }
}

function showTasks() {
    return tasksList;
}
  
module.exports = {
    Task,
    tasksList,
    addTask,   
    completeTask,
    deleteTask,
    showTasks,
}

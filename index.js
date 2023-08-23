const express = require("express");

const app = express();

const port = 3000;

const tasks = [
    {
        "id":"123456",
        "isCompleted":false,
        "description":"Walk the dog",
    }
];

app.get("/tasks", (req, res) => {
    res.status(200).send(tasks);
});

app.listen(port, () => {
    console.log(`Server listening in port ${port}`)
});
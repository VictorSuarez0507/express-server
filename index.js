const express = require("express");

const app = express();

const port = 3000;

const viewRouter = require("./list-view-router");
const editRouter = require("./list-edit-router");

app.use(express.json());

app.use("/tasks", editRouter);
app.use("/tasks", viewRouter);

app.listen(port, () => {
    console.log(`Server listening in port ${port}`)
});
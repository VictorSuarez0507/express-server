const express = require("express");

const app = express();

const port = 3000;

const viewRouter = require("./list-view-router");
const editRouter = require("./list-edit-router");

app.use(express.json());

function validateMethods (req, res, next) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const method = req.method.toUpperCase();

    if (!methods.includes(method)) {
        return res.status(405).json({ error: `El Método http ${method} no está permitido` });
    }
    next();
}

app.use(validateMethods);



app.use("/tasks", editRouter);
app.use("/tasks", viewRouter);

app.listen(port, () => {
    console.log(`Server listening in port ${port}`)
});
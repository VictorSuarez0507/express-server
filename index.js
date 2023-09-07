const express = require("express");
const app = express();
const port = 3000;

require("dotenv").config();
const secretKey = process.env.SECRET_KEY;

const jwt = require("jsonwebtoken");

const viewRouter = require("./list-view-router");
const editRouter = require("./list-edit-router");



app.use(express.json());

const users = [
    { id: 1, email: "user1@prueba.com", password: "prueba1" },
    { id: 2, email: "user2@prueba.com", password: "prueba2" },
    ];

function validateMethods (req, res, next) {
    const methods = ['GET', 'POST', 'PUT', 'DELETE'];
    const method = req.method.toUpperCase();

    if (!methods.includes(method)) {
        return res.status(405).json({ error: `El Método http ${method} no está permitido` });
    }
    next();
}

function validateToken (req, res, next) {
    const userToken = req.headers.authorization;
    if(!userToken) {
        return res.status(401).json({error: "No se proporcionó ningún token"});
    }

    jwt.verify(userToken, secretKey, (err, data) => {
        if (err) {
            return res.status(403).json({error: "Token inválido o faltante. Intentalo nuevamente"});
        }
        next();
    });
}

app.post("/login", (req, res) => {
    const {email, password} = req.body;

    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
        return res.status(401).json({ error: "Email o password incorrectos, valide nuevamente"});
    }
    const token = jwt.sign({ id: user.id }, secretKey);
    res.json({ token });
});

app.get("/protected", validateToken, (req, res) => {   
    res.json({message: "Ruta protegida, se valido el token."});
});


app.use(validateMethods);

app.use("/tasks", editRouter);
app.use("/tasks", viewRouter);

app.listen(port, () => {
    console.log(`Server listening in port ${port}`)
});
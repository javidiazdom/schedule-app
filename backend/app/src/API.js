const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserController = require('./controllers/User.controlller');
const BoardController = require('./controllers/Board.controller');
const app = express();
const port = 3000;

module.exports = async function startServer () {
    try {
        await mongoose.connect('mongodb://localhost:27017/mdaDB', {
            useCreateIndex: true,
            useFindAndModify: false,
            useNewUrlParser: true
        });
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
    
    app.use(express.json());
    app.use(cors());
    
    app.post("/login", async (req, res) => {
        try {
            const response = await UserController.login(req.body);
            res.status(200); 
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(error.message);
        }
    });

    app.post("/register", async (req, res) => {
        try {
            const response = await UserController.register(req.body); 
            res.status(200);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.get("/users", async (req, res) => {
        const response = await UserController.getUsers();
        res.send(response);
    });

    app.post("/board", async (req, res) => {
        const response = await UserController.requireAuth(req.header("Authorization"), BoardController.createBoard, req.body);
        res.send(response);
    });

    app.listen(port, () => console.log(`🚀 Escuchando en el puerto ${port}`));
}

const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const UserController = require('./controllers/User.controlller');
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

    app.post("/login", async (req, res) => {
        try {
            const response = await UserController.login(req.body); 
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(error.message);
        }
    })

    app.post("/register", async (req, res) => {
        try {
            const response = await UserController.register(req.body); 
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(error.message);
        }
    });

    app.get("/users", async (req, res) => {
        const response = await UserController.getUsers();
        res.send(response);
    })

    app.listen(port, () => console.log(`🚀 Escuchando en el puerto ${port}`));
}

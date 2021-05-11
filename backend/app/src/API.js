const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const UserController = require('./controllers/User.Controller');
const BoardController = require('./controllers/Board.controller');
const TaskController = require('./controllers/Task.controller');
const User = require('./models/User');
const Task = require('./models/Task');
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

    app.post("/deleteUser", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), UserController.deleteUser, req.body); 
            res.status(200);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    })

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
        try {
            const response = await UserController.getUsers();
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
        
    });

    app.post("/board", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), BoardController.createBoard, req.body);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.get("/board/:name", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), BoardController.getBoardByName, req.params.name);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.get("/board", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), BoardController.getBoards);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.post("board/:name", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), BoardController.deleteBoard, req.params.name);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.post("/task/:name", async (req, res) => {
        try {
            const response = await UserController.requireAuthExtraParams(req.header("Authorization"), TaskController.createTask, req.body, req.params.name);
            res.send(response);
        } catch (error) {
            console.log(error);
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.get("/tasks", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), TaskController.getTasks);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.get("/tasks/:boardName", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), TaskController.getTasksByBoardName, req.params.boardName);
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.post("/task/:boardName", async (req, res) => {
        try {
            await UserController.requireAuth(req.header("Authorization"), TaskController.getTasksByBoardName, req.params.boardName);
        } catch(error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}))
        }
    });

    app.post("/task/:boardName/:taskId", async (req, res) => {
        try {
            await UserController.requireAuthExtraParams(req.header("Authorization"), TaskController.removeTask, req.params.boardName, req.params.taskId);
            res.status(200);
            res.send("Borrado con exito");
        } catch(error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}))
        }
    });

    app.get("/tasks/:boardId/:taskId", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), TaskController.getTaskByTaskName, {boardId: req.params.boardId, taskId: req.params.taskId});
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.put("/task/:boardName/:taskId", async (req, res) => {
        try {
            const response = await UserController.requireAuth(req.header("Authorization"), TaskController.updateTask, {boardName: req.params.boardName, taskId: req.params.taskId, body: req.body});
            res.send(response);
        } catch (error) {
            res.status(401);
            res.send(JSON.stringify({error: error.message}));
        }
    });

    app.listen(port, () => console.log(`🚀 Escuchando en el puerto ${port}`));
}

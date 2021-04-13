const express = require('express');
const mongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const app = express();
const port = 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mdaDB', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true
    }).then(db => console.log('conexion exitosa'))
    .catch(err => console.log('error: ', err))

const usersSchema = mongoose.Schema({
    username: String,
    name: String,
    password: String,
    birthDate: String,
    boards: Array,
    tasks: Array
});

const Users = mongoose.model("Users", usersSchema, "Users");

app.get("/user", (req, res) => {
    const name = req.query.name;
    Users.findOne({"name": name},(err, user) => {
        if(err) {
            res.status(500);
            res.send("Error:: Acceso a base de datos");
        } else {
            if(user == undefined || user == "" || user == null) {
                res.status(404);
                res.send("Error:: Usuario no encontrado");
            } else {
                res.status(200);
                res.send(user);
            }
            
        }
    });
});

app.post("/user", (req, res) => {
    let user = req.body;
    user["tasks"] = [];
    user["boards"] = [];
    try {
        if(userExist(user.name)) {
            res.status(500);
            res.send("Error:: Usuario ya existe");
            return;
        }
        insertUser(user);
        res.status(200);
        res.send("Usuario creado con exito");
    } catch(error) {
        res.status(500);
        res.send("Error:: Usuario no creado");
    }
    
    res.send("Usuario creado");
});

function userExist(name) {
    Users.findOne({"name": name},(err, user) => {
        if(err) {
            throw new Error(err);
        } else {
            if(user == undefined || user == "" || user == null) {
                return false;
            } else {
                return true;
            }   
        }
    });
}

function insertUser(user) {
    try {
        if(userExist(user.name)) {
            return false;
        }
        Users.create(user);
        return true;
    } catch (error) {
        throw new Error("Error: Acceso a base de datos");
    }
}

app.listen(port, () => console.log("Escuchando en el puerto 3000"));
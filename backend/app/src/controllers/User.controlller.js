const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');


const login = async (loginCredentials) => {
    const user = await User.findOne({username: loginCredentials.username});
    if (!user) {
        throw Error("El nombre de usuario es incorrecto");
    }
    if (user.password != loginCredentials.password) {
        throw Error("La contraseña es incorrecta");
    }
    const accessToken = jwt.sign({user: user.username}, config.SECRET);
    // Add role
    return {accessToken};
}

const register = async (userData) => {
    if (!userData.name || !userData.username || !userData.password || !userData.birthDate ) {
        throw Error("Campos insuficientes");
    }
    const existingUser = await User.find({username: userData.username});
    if (existingUser[0]) {
        throw Error("User already exists");
    }
    const newUser = new User({
        name: userData.name,
        username: userData.username,
        password: userData.password,
        birthDate: userData.birthDate,
        boards: [],
        tasks: []
    });
    await newUser.save();
    return "Usuario creado";
}

const getUsers = async () => {
    const users = await User.find();
    return users;
}

exports.login = login;
exports.register = register;
exports.getUsers = getUsers;

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');


const login = async (loginCredentials) => {
    const user = await User.find({username: loginCredentials.username});
    if (!user) {
        throw Error("El nombre de usuario es incorrecto");
    }
    if (user.password !== loginCredentials.password) {
        throw Error("La contraseña es incorrecta");
    }
    const accessToken = jwt.sign({user: user.username}, config.SECRET);
    // Add role
    return {accessToken};
}

const register = async (userData) => {
    if (!userData.name || !userData.username || !userData.password || !userData.birtDate ) {
        throw Error("Campos insuficientes");
    }
    const newUser = new User({
        name: userData.name,
        username: userData.username,
        password: userData.password,
        birtDate: userData.username,
        boards: [],
        tasks: []
    });
    await newUser.save();
    return "Usuario creado";
}

const getUsers = async () => {
    return await User.find();
}

exports.login = login;
exports.register = register;
exports.getUsers = getUsers;

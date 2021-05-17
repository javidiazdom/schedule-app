const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config.json');
const bcrypt = require('bcrypt');


const login = async (loginCredentials) => {
    const user = await User.findOne({username: loginCredentials.username});
    if (!user) {
        throw Error("El nombre de usuario es incorrecto");
    }
    const valid = await bcrypt.compare(loginCredentials.password,user.password);
    if (!valid) {
        throw Error("La contraseña es incorrecta");
    }
    const accessToken = jwt.sign({user: user.username}, config.SECRET);
    // Add role
    return JSON.stringify({accessToken, user: user.name, username: user.username});
}

const register = async (userData) => {
    if (!userData.name || !userData.username || !userData.password || !userData.birthDate) {
        throw Error("Campos insuficientes");
    }
    const existingUser = await User.find({username: userData.username});
    if (existingUser[0]) {
        throw Error("User already exists");
    }

    const hashsedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = new User({
        name: userData.name,
        username: userData.username,
        password: hashsedPassword,
        birthDate: userData.birthDate,
        boards: []
    });
    await newUser.save();
    return JSON.stringify({result: true});
}

const getUsers = async () => {
    const users = await User.find();
    return users;
}

const requireAuth = async (auth,f,params) => {
    if(!auth) throw new Error("Necesitas estar logueado");
    const token = auth.split("Bearer ")[1];
    if(!token) throw new Error("Token invalido");
    const user = await jwt.verify(token, config.SECRET);
    if(!user) throw new Error("Usuario no identificado");
    return await f(params,user);
}

const requireAuthExtraParams = async (auth,f,params,aditionalParams) => {
    if(!auth) throw new Error("Necesitas estar logueado");
    const token = auth.split("Bearer ")[1];
    if(!token) throw new Error("Token invalido");
    const user = await jwt.verify(token, config.SECRET);
    if(!user) throw new Error("Usuario no identificado");
    return await f(params,aditionalParams,user);
}

const deleteUser = async (params, user) => {
    try {
        await User.deleteOne({username: user.user});
        return true; 
    } catch (error) {
        return error;
    }
}

const getProfile = async (params, user) => {
    try {
        return await User.findOne({username: user.user},['name', 'username', 'birthDate']);
    } catch (error) {
        return error;
    }
}


exports.login = login;
exports.register = register;
exports.getUsers = getUsers;
exports.requireAuth = requireAuth;
exports.requireAuthExtraParams = requireAuthExtraParams;
exports.deleteUser = deleteUser;
exports.getProfile = getProfile;
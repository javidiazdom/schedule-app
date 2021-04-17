const mongoose = require('mongoose');

const User = mongoose.model(
    "User",
    {
        username: String,
        name: String,
        password: String,
        birthDate: String,
        boards: Array,
        tasks: Array
    },
    "User"
)

exports.User = User;
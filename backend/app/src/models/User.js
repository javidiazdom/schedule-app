const mongoose = require('mongoose');

module.exports = mongoose.model(
    "User",
    {
        username: String,
        name: String,
        password: String,
        birthDate: String,
        boards: Array
    },
    "Users"
)
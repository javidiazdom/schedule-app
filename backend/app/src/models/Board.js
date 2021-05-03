const mongoose = require('mongoose');

module.exports = mongoose.model(
    "Tablero",
    {
        name: String,
        tasks: Array
    },
    "Tableros"
)
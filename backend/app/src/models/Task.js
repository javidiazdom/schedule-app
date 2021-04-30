const mongoose = require('mongoose');

module.exports = mongoose.model(
    "Tarea",
    {
        name: String,
        description: String
    },
    "Tareas"
)
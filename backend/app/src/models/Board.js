const mongoose = require('mongoose');

module.exports = mongoose.model(
    "Tablero",
    {
        name: String,
        pendingTasks: Array,
        doneTasks: Array,
        inProgressTasks: Array
    },
    "Tableros"
)
const User = require('../models/User');
const Board = require('../models/Board');
const Task = require('../models/Task');

const createTask = async (task, boardName, user) => {
    const actualBoard = await getActualBoard(boardName, user.user);
    if(await existTaskWithName(user.user, task.name)) throw new Error(`Ya existe una tarea con el nombre ${task.name} en el usuario ${user.user}`);
    const tasks = await Task.insertMany(task);
    actualBoard.tasks.push(tasks[0]);
    await Board.findOneAndUpdate({_id: actualBoard._id}, actualBoard, {new: true});
    const updatedBoards = await getUpdatedBoards(user.user);
    await User.findOneAndUpdate({username: user.user}, {boards: updatedBoards}, {new: true});
    return tasks[0];
};

const existTaskWithName = async (username, taskName) => {
    const user = await User.findOne({username: username});
    const userBoards = user.boards;
    for(board of userBoards) {
        const tasks = board.tasks;
        const search = tasks.find(task => task.name == taskName);
        if(search != null || search != undefined) return true;
    }
    return false;
};

const getActualBoard = async (boardName, username) => {
    const actualUser = await User.findOne({username:username});
    const boards = actualUser.boards;
    if(boards == null) throw new Error(`No existe tableros en el usuario ${user.user}`);
    const actualBoard = boards.find((board) => board.name == boardName);
    return actualBoard;
};

const getUpdatedBoards = async (username) => {
    const actualUser = await User.findOne({username:username});
    let boardsId = [];
    actualUser.boards.forEach((board) => boardsId.push(board._id));
    let updatedBoards = [];
    for(const id of boardsId) {
        const actualBoard = await Board.findOne({_id:id});
        updatedBoards.push(actualBoard);
    }
    return updatedBoards;
};


exports.createTask = createTask;
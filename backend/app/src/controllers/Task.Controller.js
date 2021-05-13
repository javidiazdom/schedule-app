const User = require('../models/User');
const Board = require('../models/Board');
const Task = require('../models/Task');
const { getBoardByName, getBoardById } = require('./Board.controller');

const createTask = async (task, boardName, user) => {
    const actualBoard = await getActualBoard(boardName, user.user);
    if(await existTaskWithName(user.user, task.name, boardName)) throw new Error(`Ya existe una tarea con el nombre ${task.name} en el usuario ${user.user}`);
    const tasks = await Task.insertMany(task);
    actualBoard.tasks.push(tasks[0]);
    await Board.findOneAndUpdate({_id: actualBoard._id}, actualBoard, {new: true});
    const updatedBoards = await getUpdatedBoards(user.user);
    await User.findOneAndUpdate({username: user.user}, {boards: updatedBoards}, {new: true});
    return tasks[0];
};

const existTaskWithName = async (username, taskName, boardName) => {
    const user = await User.findOne({username: username});
    const userBoards = user.boards;
    for(board of userBoards) {
        if(board.name === boardName) {
            const tasks = board.tasks;
            const search = tasks.find(task => task.name == taskName);
            if(search != null || search != undefined) return true;
        }
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

const getTasks = async (params, user) => {
    const actualUser = await User.findOne({username:user.user});
    const boards = actualUser.boards;
    let tasks = [];
    for(board of boards) {
        const actualTasks = board.tasks;
        actualTasks.forEach((task) => tasks.push(task));
    }
    return tasks;   
};

const getTasksByBoardName = async (params, user) => {
    const actualBoard = await getBoardByName(params, user);
    return actualBoard[0].tasks;   
};

const removeTask = async (boardName, id, user) => {
    await Task.findByIdAndDelete(id);
    await updateBoard(boardName, user);
    await updateUser(boardName, user);
};

const updateBoard = async (boardName, user) => {
    const updatedTasks = [];
    const actualBoard = await getBoardById(boardName, user);
    for(task of actualBoard[0].tasks) {
        const actualTask = await Task.findById(task._id);
        console.log(task);
        if(actualTask) updatedTasks.push(actualTask);
    }
    let doc = await Board.findOneAndUpdate({name: actualBoard[0].name}, {tasks: updatedTasks}, {new : true});
    doc.save();
};

const updateUser = async (boardName, user) => {
    const actualBoard = await getBoardById(boardName, user);
    const updatedBoard = await Board.findById(actualBoard[0]._id);
    await User.findOneAndUpdate({username: user.user}, {boards: updatedBoard}, {new : true});
};

const getTaskByTaskName = async (params, user) => {
    const actualBoard = await Board.findOne({_id: params.boardId});
    task = null;
    actualBoard.tasks.forEach((currentTask) => {
        if (currentTask._id == params.taskId) {
            task = currentTask;
        }
    });
    return task;
};

const updateTask = async (params, user) => {
    await Task.findByIdAndUpdate(params.taskId, params.body);
    await updateBoard(params.boardName, user);
    await updateUser(params.boardName, user);
    return await Task.findById(params.taskId);
};

exports.createTask = createTask;
exports.getTasks = getTasks;
exports.getTasksByBoardName = getTasksByBoardName;
exports.removeTask = removeTask;
exports.getTaskByTaskName = getTaskByTaskName;
exports.updateTask = updateTask;

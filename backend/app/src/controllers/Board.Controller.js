const Board = require('../models/Board');
const User = require('../models/User');
const Task = require('../models/Task');

const createBoard = async (params, user) => {
    const actualUser = await User.findOne({username: user.user});
    if(existBoardForUser(actualUser.boards, params.name)) throw Error(`El tablero con nombre ${params.name} ya existe para el usuario ${user.user}`);
    const board = await Board.insertMany(params);
    actualUser.boards.push(board[0]);
    await User.findOneAndUpdate({username: user.user}, {boards: actualUser.boards}, {new : true});
    return board;
};

const existBoardForUser = (boards, newBoard) => {
    return boards.find((board) => board.name === newBoard);
};

const getBoardById = async (params, user) => {
    const actualUser = await User.findOne({username: user.user});
    const boards = actualUser.boards;
    if(boards == null) throw new Error(`No existe tableros con la ${params} en el usuario ${user.user}`);
    const boardById = boards.filter((board) => board._id == params);
    return boardById;
};

const getBoardByName = async (params, user) => {
    const actualUser = await User.findOne({username: user.user});
    const boards = actualUser.boards;
    if(boards == null) throw new Error(`No existe tableros con el nombre ${params} en el usuario ${user.user}`);
    const boardByName = boards.filter((board) => board.name == params);
    return boardByName;
};

const getBoards = async (params, user) => {
    const actualUser = await User.findOne({username: user.user});
    return actualUser.boards;
    
};

const deleteBoard = async (boardName, user) => {
    const actualBoard = await getBoardByName(boardName, user);
    await removeAllTask(boardName, user);
    await Board.deleteOne({_id: actualBoard[0]._id});
    await updateUser(boardName, user);
};

const removeAllTask = async (boardName, user) => {
    const tasksId = [];
    const actualBoard = await getBoardByName(boardName, user);
    actualBoard[0].tasks.forEach(task => tasksId.push(task._id));
    for(id of tasksId) {
        await Task.findByIdAndDelete(id);
    }
};

const updateUser = async (boardName, user) => {
    const boards = await getBoards(null, user);
    const updatedBoards = [];
    for(board of boards) {
        if(board.name !== boardName) {
            updatedBoards.push(board);
        }
    }
    console.log(updatedBoards);
    await User.findOneAndUpdate({username: user.user}, {boards: updatedBoards}, {new: true});
};

exports.createBoard = createBoard;
exports.getBoardByName = getBoardByName;
exports.getBoards = getBoards;
exports.deleteBoard = deleteBoard;
exports.getBoardById = getBoardById;
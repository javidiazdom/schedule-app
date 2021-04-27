const Board = require('../models/Board');
const User = require('../models/User');

const createBoard = async (params, user) => {
    const actualUser = await User.findOne({username: user.user});
    if(existBoardForUser(actualUser.boards, params.name)) throw Error("Board already exist");
    const board = await Board.insertMany(params);
    actualUser.boards.push(board[0]);
    await User.findOneAndUpdate({username: user.user}, {boards: actualUser.boards}, {new : true});
    return board;
};

const existBoardForUser = (boards, newBoard) => {
    
    console.log(boards);
    return boards.find((board) => {
        return board.name === newBoard;
    });
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

exports.createBoard = createBoard;
exports.getBoardByName = getBoardByName;
exports.getBoards = getBoards;
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

exports.createBoard = createBoard;
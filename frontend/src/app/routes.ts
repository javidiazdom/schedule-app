const URL = "http://localhost:3000";

export const Routes = {
    login: `${URL}/login`,
    register: `${URL}/register`,
    createBoard: `${URL}/board`,
    createTask: (boardName: String) => {return `${URL}/task/${boardName}`},
    getBoards: `${URL}/board`
}
const URL = "http://localhost:3000";

export const Routes = {
    login: `${URL}/login`,
    register: `${URL}/register`,
    createBoard: `${URL}/board`,
    createTask: (boardName: String) => {return `${URL}/task/${boardName}`},
    getTaskInfo: (boardId: String, taskId: String) => {return `${URL}/tasks/${boardId}/${taskId}`},
    deleteTask: (boardName: String, taskId: String) => {return `${URL}/tasks/${boardName}/${taskId}`},
    getBoardById: (boardId: String) => {return `${URL}/board/${boardId}`},
    updateTask: (boardName: String, taskId: String) => {return `${URL}/tasks/${boardName}/${taskId}`},
    getBoards: `${URL}/board`,
    deleteUser: `${URL}/deleteUser`
}
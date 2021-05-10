const URL = "http://localhost:3000";

export const Routes = {
    login: `${URL}/login`,
    register: `${URL}/register`,
    createBoard: `${URL}/board`,
    createTask: (boardName: String) => {return `${URL}/task/${boardName}`},
    getTaskInfo: (boardId: String, taskId: String) => {return `${URL}/tasks/${boardId}/${taskId}`},
    getBoards: `${URL}/board`,
    deleteUser: `${URL}/deleteUser`
}
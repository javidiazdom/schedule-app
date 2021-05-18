const URL = "http://localhost:3000";

export const Routes = {
    login: `${URL}/login`,
    register: `${URL}/register`,
    profileData: `${URL}/profile`,
    updateProfile: `${URL}/user`,
    createBoard: `${URL}/board`,
    createTask: (boardName: String) => {return `${URL}/task/${boardName}`},
    getTaskInfo: (boardId: String, taskId: String) => {return `${URL}/tasks/${boardId}/${taskId}`},
    deleteTask: (boardName: String, taskId: String) => {return `${URL}/tasks/${boardName}/${taskId}`},
    getBoardById: (boardId: String) => {return `${URL}/board/${boardId}`},
    updateBoard: (boardName: String) => {return `${URL}/board/${boardName}`},
    updateTask: (boardName: String, taskId: String) => {return `${URL}/tasks/${boardName}/${taskId}`},
    deleteBoard: (boardName: String) => {return `${URL}/board/${boardName}`},
    getBoards: `${URL}/board`,
    deleteUser: `${URL}/deleteUser`
}
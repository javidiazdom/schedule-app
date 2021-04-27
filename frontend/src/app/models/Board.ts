import {Task} from './Task';

export interface Board {
    name: String;
    pendingTasks: Task[];
    inProgressTasks: Task[];
    doneTasks: Task[];

}
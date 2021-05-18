import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './models/User';
import {Routes} from './routes';
import {UserRegisterData} from './models/UserRegisterData'
import {Board} from './models/Board';
import { Task } from './models/Task';
import { Observable } from 'rxjs';
import { ProfileData } from './models/ProfileData';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post(Routes.login, user);
  }
  register(userResgisterData: UserRegisterData) {
    return this.http.post(Routes.register, userResgisterData);
  }

  getProfileData(): Observable<ProfileData> {
    return this.http.get<ProfileData>(Routes.profileData, {headers: this.getHeaders()});
  }

  updateProfile(userProfileData: ProfileData) {
    return this.http.put(Routes.updateProfile, userProfileData,{headers: this.getHeaders()});
  }

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(Routes.getBoards, {headers: this.getHeaders()});
  }

  deleteBoard(boardName: String): Observable<Board> {
    console.log(Routes.deleteBoard(boardName));
    return this.http.delete<Board>(Routes.deleteBoard(encodeURIComponent(boardName as string)), {headers: this.getHeaders()});
  }

  getBoardById(boardId: String): Observable<Board> {
    return this.http.get<Board>(Routes.getBoardById(boardId), {headers: this.getHeaders()})
  }

  createBoard(board: Board) {
    return this.http.post(Routes.createBoard, board, {headers: this.getHeaders()});
  }

  updateBoard(newBoardName: String, boardName: String){
    return this.http.put(Routes.updateBoard(encodeURIComponent(boardName as string)), {name: newBoardName},{headers: this.getHeaders()});
  }

  createTask(task: Task){
    return this.http.post(Routes.createTask(task.boardName), task, {headers: this.getHeaders()});  
  }

  deleteTask(boardName: String, taskId: String) {
    return this.http.delete(Routes.deleteTask(encodeURIComponent(boardName as string),taskId), {headers: this.getHeaders()});
  }

  updateTask(boardName: String, taskId: String, task: Task) {
    return this.http.put(Routes.updateTask(encodeURIComponent(boardName as string), taskId), task, {headers: this.getHeaders()});
  }

  getTaskInfo(boardId: String,taskId: String): Observable<Task> {
    return this.http.get<Task>(Routes.getTaskInfo(boardId, taskId),{headers: this.getHeaders()});
  }

  deleteUser() {
    return this.http.post(Routes.deleteUser,{},{headers: this.getHeaders()});
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('accessToken')
    });
  }
}

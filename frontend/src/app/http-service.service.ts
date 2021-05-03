import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {User} from './models/User';
import {Routes} from './routes';
import {UserRegisterData} from './models/UserRegisterData'
import {Board} from './models/Board';
import { Task } from './models/Task';
import { Observable } from 'rxjs';


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

  getBoards(): Observable<Board[]> {
    return this.http.get<Board[]>(Routes.getBoards, {headers: this.getHeaders()});
  }

  createBoard(board: Board) {
    return this.http.post(Routes.createBoard, board, {headers: this.getHeaders()});
  }

  createTask(task: Task){
    return this.http.post(Routes.createTask(task.boardName), task, {headers: this.getHeaders()});  
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Authorization': 'Bearer '+ window.sessionStorage.getItem('accessToken')
    });
  }
}

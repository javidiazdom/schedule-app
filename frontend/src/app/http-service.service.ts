import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {User} from './models/User';
import {Routes} from './routes';
import {UserRegisterData} from './models/UserRegisterData'


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
}

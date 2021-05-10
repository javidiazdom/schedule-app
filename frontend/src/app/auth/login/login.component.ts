import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { User } from '../../models/User';
import { HttpService } from '../../http-service.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  
  userName =  new FormControl('');
  password =  new FormControl('');

  sendForm() {
    const user: User = {
      username: this.userName.value,
      password: this.password.value
    };
    this.httpService.login(user).subscribe(
      (res) => {
        sessionStorage.setItem('accessToken', res['accessToken']);
        sessionStorage.setItem('user', res['user']);
        window.location.replace("boards")
    });
  }

  ngOnInit(): void {
  }

}

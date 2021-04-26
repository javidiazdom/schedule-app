import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../http-service.service';
import {UserRegisterData} from '../../models/UserRegisterData';

class RegisterResponse {
  result: Boolean;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  userName =  new FormControl('');
  password =  new FormControl('');
  name =  new FormControl('');
  birthDate =  new FormControl('');


  ngOnInit(): void {
  }

  sendForm() {
    const newUser: UserRegisterData = {
      username: this.userName.value,
      name: this.name.value,
      birthDate: this.birthDate.value,
      password: this.password.value
    }
    this.httpService.register(newUser).subscribe((response: RegisterResponse) => {
      if (response.result) {
        window.location.replace("/login");
      }
    });
  }

}

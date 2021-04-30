import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  logout() {
    sessionStorage.clear();
    window.location.replace("login");
  }

  ngOnInit(): void {
  }
}
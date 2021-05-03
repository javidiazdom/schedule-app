import { Component, OnInit } from '@angular/core';
import { HttpService } from "../../http-service.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  userName: String = sessionStorage.getItem('user'); 

  deleteUser(): void {
    if (confirm("¿Está seguro de que desea eliminar la cuenta de usuario?")) {
      console.log("Delete Profile");
      this.httpService.deleteUser().subscribe((result) => {
        if (result) {
          window.sessionStorage.clear();
          window.location.replace("/login");
        } else {
          alert("La cuenta de usuario no ha sido eliminada");
        }
      });
    }
  }
  
  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from "../../http-service.service";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  userName: String = sessionStorage.getItem('user');

  currentBoard: String;

  currentBoardName: String;

  currentTask: String;

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
    const routeParams = this.route.snapshot.paramMap;  
    this.currentBoardName = routeParams.get('boardName');
    this.currentTask = routeParams.get('taskId');
    this.currentBoard = routeParams.get('boardId');
  }

}

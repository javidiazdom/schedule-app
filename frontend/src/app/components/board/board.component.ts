import { Component, OnInit, Input } from '@angular/core';
import { Board } from 'src/app/models/Board';
import { Task } from 'src/app/models/Task';
import { HttpService } from 'src/app/http-service.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  tasks: Task[];

  constructor(private httpService: HttpService) { }

  deleteBoard(): void {
    this.httpService.deleteBoard(this.board.name).subscribe(
      response => {
        window.location.reload();
      }
    );
  }

  ngOnInit(): void {
    this.tasks = this.board.tasks;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http-service.service';
import { Board } from 'src/app/models/Board';
import { Task } from 'src/app/models/Task';
import { BoardComponent } from '../board/board.component';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  board: Board;
  task: Task;

  constructor(private httpService: HttpService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.httpService.getTaskInfo(routeParams.get('boardId'), routeParams.get('taskId')).subscribe(task => {
      this.task = task;
    });
  }

}

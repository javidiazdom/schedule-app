import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/http-service.service';
import { Board } from 'src/app/models/Board';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.boardName = routeParams.get('boardName') || '';
    this.httpService.getTaskInfo(routeParams.get('boardId'), routeParams.get('taskId')).subscribe(task => {
      this.task = task;
      this.taskName.setValue(this.task.name);
    });
    this.httpService.getBoardById(routeParams.get('boardId')).subscribe(board => {
      this.board = board;
    })
  }

  boardName: String;
  board: Board;
  task: Task;

  taskName = new FormControl('');
  boardNameControl = new FormControl('');

  sendForm(): void {
    this.httpService.updateTask(this.board.name,this.task._id,{...this.task, name: this.taskName.value}).subscribe(
      response => {
        window.location.replace("/boards");
      }
    )
  }

  sendBoardNameForm(): void {
    this.httpService.updateBoard(this.boardNameControl.value, this.boardName).subscribe(
      response => {
        window.location.replace("/boards");
      }
    )
  }

  deleteTask(): void {
    this.httpService.deleteTask(this.board.name, this.task._id).subscribe(
      response => {
        window.location.replace("/boards");
      }
    )
  }

  ngOnInit(): void {
    this.boardNameControl.setValue(this.boardName);
  }
}

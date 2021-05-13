import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  constructor(private httpService: HttpService, private route: ActivatedRoute) {
    const routeParams = this.route.snapshot.paramMap;
    this.httpService.getTaskInfo(routeParams.get('boardId'), routeParams.get('taskId')).subscribe(task => {
      this.task = task;
      this.taskName.setValue(this.task.name);
    });
  }

  board: Board;
  task: Task;

  taskName = new FormControl('');

  sendForm(): void {
    this.httpService.updateTask(this.task._id, {name: this.taskName.value, ...this.task});
  }

  deleteTask(): void {
    this.httpService.deleteTask(this.board.name, this.task._id);
  }

  ngOnInit(): void {
    
  }

}

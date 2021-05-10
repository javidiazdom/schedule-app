import { Component, Input, OnInit } from '@angular/core';
import { Board } from 'src/app/models/Board';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() task: Task;
  @Input() board: Board;

  constructor() { }

  displaySideBar(): void {
    window.location.replace(`/boards/${this.board._id}/${this.task._id}`)
  };

  ngOnInit(): void {
  }

}

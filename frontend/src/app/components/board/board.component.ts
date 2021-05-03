import { Component, OnInit, Input } from '@angular/core';
import { Board } from 'src/app/models/Board';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() board: Board;

  tasks: Task[];

  constructor() { }

  ngOnInit(): void {
    this.tasks = this.board.tasks;
  }

}

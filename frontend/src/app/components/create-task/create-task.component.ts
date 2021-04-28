import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../http-service.service';
import { Board } from '../../models/Board';


@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  @Output() boardCreatedEvent = new EventEmitter<string>();

  boardName = new FormControl('');
  
  isEditing = false;

  toggleForm() {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {
  }

  sendForm(): void {
    const newBoard: Board = {
      name: this.boardName.value,
      pendingTasks: [],
      inProgressTasks: [],
      doneTasks: []
    } 
    this.httpService.createBoard(newBoard).subscribe((board) => {
      this.boardCreatedEvent.emit(newBoard.name as string);
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent implements OnInit {

  constructor() { }

  taskName = new FormControl('');
  
  isEditing = false;

  toggleForm() {
    this.isEditing = !this.isEditing;
  }

  ngOnInit(): void {
  }

  sendForm(): void {
    console.log(this.taskName.value);
  }

}

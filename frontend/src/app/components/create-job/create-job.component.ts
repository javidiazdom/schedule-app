import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../http-service.service';
import { Task } from 'src/app/models/Task';
import { BoardsStatusService } from '../../boards-status.service';


@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  @Input() boardName: String;

  constructor(private httpService: HttpService, private boardStatusService: BoardsStatusService) { }

  jobName = new FormControl('');

  isEditing = false;

  ngOnInit(): void {
  }

  toggleForm(): void {
    this.isEditing = !this.isEditing;
  }

  sendForm(): void {
    const newJob: Task = {
      name: this.jobName.value,
      descripcion: "",
      boardName: this.boardName,
    }
    this.httpService.createTask(newJob).subscribe((board) => {
      this.boardStatusService.updateBoards();
    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpService } from '../../http-service.service';
import { Task } from 'src/app/models/Task';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  @Input() boardName: String;

  constructor(private httpService: HttpService) { }

  jobName = new FormControl('');

  ngOnInit(): void {
  }

  sendForm(): void {
    const newJob: Task = {
      name: this.jobName.value,
      descripcion: "",
      boardName: this.boardName
    } 
    this.httpService.createTask(newJob).subscribe((board) => {
      console.log(board);
    });
  }

}

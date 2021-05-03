import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Task } from 'src/app/models/Task';
import { HttpService } from '../../http-service.service';

@Component({
  selector: 'app-create-job',
  templateUrl: './create-job.component.html',
  styleUrls: ['./create-job.component.css']
})
export class CreateJobComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  jobName = new FormControl('');

  ngOnInit(): void {
  }

  sendForm(): void {
    const newJob: Task = {
      name: this.jobName.value,
      descripcion: "";
      boardName: ;
    } 
    this.httpService.createTask(newJob).subscribe((board) => {
      console.log(board);
    });
  }

}

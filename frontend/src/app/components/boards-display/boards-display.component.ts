import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../http-service.service';
import { Board } from '../../models/Board';

@Component({
  selector: 'app-boards-display',
  templateUrl: './boards-display.component.html',
  styleUrls: ['./boards-display.component.css']
})
export class BoardsDisplayComponent implements OnInit {

  constructor(private httpService: HttpService) { }

  boards: Board[] = [];

  ngOnInit(): void {
    this.httpService.getBoards().subscribe((boards) => {
      this.boards = boards;
    });
  }

}

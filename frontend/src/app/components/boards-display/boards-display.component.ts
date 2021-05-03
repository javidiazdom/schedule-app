import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BoardsStatusService } from 'src/app/boards-status.service';
import { HttpService } from '../../http-service.service';
import { Board } from '../../models/Board';

@Component({
  selector: 'app-boards-display',
  templateUrl: './boards-display.component.html',
  styleUrls: ['./boards-display.component.css']
})

export class BoardsDisplayComponent implements OnInit {

  subscription: Subscription;

  constructor(private httpService: HttpService, private boardStatusService: BoardsStatusService) {
    this.subscription = this.boardStatusService.getUpdate().subscribe(
      message => {
        this.updateBoards();
      }
    )
  }

  boards: Board[] = [];

  ngOnInit(): void {
    this.updateBoards();
  }

  updateBoards(): void {
    this.httpService.getBoards().subscribe((boards: Board[] ) => {
      this.boards = boards;
    });
  }

}

import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardsStatusService {
  private subject = new Subject<any>();

  updateBoards() {
    this.subject.next();
  };

  getUpdate(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}

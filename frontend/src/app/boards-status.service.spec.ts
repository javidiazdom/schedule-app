import { TestBed } from '@angular/core/testing';

import { BoardsStatusService } from './boards-status.service';

describe('BoardsStatusService', () => {
  let service: BoardsStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardsStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardsDisplayComponent } from './boards-display.component';

describe('BoardsDisplayComponent', () => {
  let component: BoardsDisplayComponent;
  let fixture: ComponentFixture<BoardsDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoardsDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardsDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

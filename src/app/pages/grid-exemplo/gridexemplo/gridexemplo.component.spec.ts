import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridexemploComponent } from './gridexemplo.component';

describe('GridexemploComponent', () => {
  let component: GridexemploComponent;
  let fixture: ComponentFixture<GridexemploComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridexemploComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridexemploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

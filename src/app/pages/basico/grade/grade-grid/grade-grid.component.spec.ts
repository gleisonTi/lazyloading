import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradeGridComponent } from './grade-grid.component';

describe('GradeGridComponent', () => {
  let component: GradeGridComponent;
  let fixture: ComponentFixture<GradeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

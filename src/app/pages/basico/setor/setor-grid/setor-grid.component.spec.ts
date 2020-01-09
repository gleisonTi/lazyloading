import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetorGridComponent } from './setor-grid.component';

describe('SetorGridComponent', () => {
  let component: SetorGridComponent;
  let fixture: ComponentFixture<SetorGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetorGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

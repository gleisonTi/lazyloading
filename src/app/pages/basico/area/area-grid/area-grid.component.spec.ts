import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaGridComponent } from './area-grid.component';

describe('AreaGridComponent', () => {
  let component: AreaGridComponent;
  let fixture: ComponentFixture<AreaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

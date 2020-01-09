import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRemoteComponent } from './grid-remote.component';

describe('GridRemoteComponent', () => {
  let component: GridRemoteComponent;
  let fixture: ComponentFixture<GridRemoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridRemoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRemoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

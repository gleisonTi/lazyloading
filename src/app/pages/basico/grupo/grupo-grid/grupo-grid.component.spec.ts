import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoGridComponent } from './grupo-grid.component';

describe('GrupoGridComponent', () => {
  let component: GrupoGridComponent;
  let fixture: ComponentFixture<GrupoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

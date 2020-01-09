import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FabricanteGridComponent } from './fabricante-grid.component';

describe('FabricanteGridComponent', () => {
  let component: FabricanteGridComponent;
  let fixture: ComponentFixture<FabricanteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FabricanteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FabricanteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

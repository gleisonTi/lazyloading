import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaGridComponent } from './referencia-grid.component';

describe('ReferenciaGridComponent', () => {
  let component: ReferenciaGridComponent;
  let fixture: ComponentFixture<ReferenciaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

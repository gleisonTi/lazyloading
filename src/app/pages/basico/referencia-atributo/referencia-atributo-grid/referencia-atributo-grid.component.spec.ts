import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaAtributoGridComponent } from './referencia-atributo-grid.component';

describe('ReferenciaAtributoGridComponent', () => {
  let component: ReferenciaAtributoGridComponent;
  let fixture: ComponentFixture<ReferenciaAtributoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaAtributoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaAtributoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

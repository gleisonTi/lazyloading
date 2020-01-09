import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariacaoConsumoGridComponent } from './variacao-consumo-grid.component';

describe('VariacaoConsumoGridComponent', () => {
  let component: VariacaoConsumoGridComponent;
  let fixture: ComponentFixture<VariacaoConsumoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariacaoConsumoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariacaoConsumoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

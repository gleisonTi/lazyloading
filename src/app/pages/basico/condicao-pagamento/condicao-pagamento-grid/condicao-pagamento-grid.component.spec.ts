import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CondicaoPagamentoGridComponent } from './condicao-pagamento-grid.component';

describe('CondicaoPagamentoGridComponent', () => {
  let component: CondicaoPagamentoGridComponent;
  let fixture: ComponentFixture<CondicaoPagamentoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CondicaoPagamentoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CondicaoPagamentoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

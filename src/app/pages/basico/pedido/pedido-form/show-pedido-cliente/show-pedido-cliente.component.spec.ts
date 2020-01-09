import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowPedidoClienteComponent } from './show-pedido-cliente.component';

describe('ShowPedidoClienteComponent', () => {
  let component: ShowPedidoClienteComponent;
  let fixture: ComponentFixture<ShowPedidoClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowPedidoClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowPedidoClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

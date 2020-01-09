import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoGridComponent } from './pedido-grid.component';

describe('PedidoGridComponent', () => {
  let component: PedidoGridComponent;
  let fixture: ComponentFixture<PedidoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

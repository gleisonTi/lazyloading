import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemGridComponent } from './pedido-item-grid.component';

describe('PedidoItemGridComponent', () => {
  let component: PedidoItemGridComponent;
  let fixture: ComponentFixture<PedidoItemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoItemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

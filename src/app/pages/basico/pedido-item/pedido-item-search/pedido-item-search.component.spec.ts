import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidoItemSearchComponent } from './pedido-item-search.component';

describe('PedidoItemSearchComponent', () => {
  let component: PedidoItemSearchComponent;
  let fixture: ComponentFixture<PedidoItemSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PedidoItemSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PedidoItemSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { PedidoConsumoService } from './pedido-consumo.service';

describe('PedidoConsumoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidoConsumoService = TestBed.get(PedidoConsumoService);
    expect(service).toBeTruthy();
  });
});

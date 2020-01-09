import { TestBed } from '@angular/core/testing';

import { PedidoItemTamanhoService } from './pedido-item-tamanho.service';

describe('PedidoItemTamamhoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidoItemTamanhoService = TestBed.get(PedidoItemTamanhoService);
    expect(service).toBeTruthy();
  });
});

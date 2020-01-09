import { TestBed } from '@angular/core/testing';

import { PedidoItemComissaoService } from './pedido-item-comissao.service';

describe('PedidoItemComissaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PedidoItemComissaoService = TestBed.get(PedidoItemComissaoService);
    expect(service).toBeTruthy();
  });
});

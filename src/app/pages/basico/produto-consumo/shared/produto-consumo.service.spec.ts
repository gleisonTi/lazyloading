import { TestBed } from '@angular/core/testing';

import { ProdutoConsumoService } from './produto-consumo.service';

describe('ProdutoConsumoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoConsumoService = TestBed.get(ProdutoConsumoService);
    expect(service).toBeTruthy();
  });
});

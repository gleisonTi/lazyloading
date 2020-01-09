import { TestBed } from '@angular/core/testing';

import { ProdutoSkuService } from './produto-sku.service';

describe('ProdutoSkuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoSkuService = TestBed.get(ProdutoSkuService);
    expect(service).toBeTruthy();
  });
});

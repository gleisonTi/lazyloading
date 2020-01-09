import { TestBed } from '@angular/core/testing';

import { ProdutoEstoqueService } from './produto-estoque.service';

describe('ProdutoEstoqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoEstoqueService = TestBed.get(ProdutoEstoqueService);
    expect(service).toBeTruthy();
  });
});

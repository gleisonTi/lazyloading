import { TestBed } from '@angular/core/testing';

import { TabelaPrecoProdutoService } from './tabela-preco-produto.service';

describe('TabelaPrecoProdutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaPrecoProdutoService = TestBed.get(TabelaPrecoProdutoService);
    expect(service).toBeTruthy();
  });
});

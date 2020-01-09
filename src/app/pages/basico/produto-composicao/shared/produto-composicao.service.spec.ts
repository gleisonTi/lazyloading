import { TestBed } from '@angular/core/testing';

import { ProdutoComposicaoService } from './produto-composicao.service';

describe('ProdutoComposicaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoComposicaoService = TestBed.get(ProdutoComposicaoService);
    expect(service).toBeTruthy();
  });
});

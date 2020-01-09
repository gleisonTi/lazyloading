import { TestBed } from '@angular/core/testing';

import { ProdutoAtributoService } from './produto-atributo.service';

describe('ProdutoAtributoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoAtributoService = TestBed.get(ProdutoAtributoService);
    expect(service).toBeTruthy();
  });
});

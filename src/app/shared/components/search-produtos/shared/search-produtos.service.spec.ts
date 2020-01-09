import { TestBed } from '@angular/core/testing';

import { SearchProdutosService } from './search-produtos.service';

describe('SearchProdutosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchProdutosService = TestBed.get(SearchProdutosService);
    expect(service).toBeTruthy();
  });
});

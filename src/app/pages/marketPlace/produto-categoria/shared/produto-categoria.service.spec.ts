import { TestBed } from '@angular/core/testing';

import { ProdutoCategoriaService } from './produto-categoria.service';

describe('ProdutoCategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoCategoriaService = TestBed.get(ProdutoCategoriaService);
    expect(service).toBeTruthy();
  });
});

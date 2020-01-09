import { TestBed } from '@angular/core/testing';

import { ProdutoImagemService } from './produto-imagem.service';

describe('ProdutoImagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ProdutoImagemService = TestBed.get(ProdutoImagemService);
    expect(service).toBeTruthy();
  });
});

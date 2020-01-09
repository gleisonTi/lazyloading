import { TestBed } from '@angular/core/testing';

import { VariacaoImagemService } from './variacao-imagem.service';

describe('VariacaoImagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VariacaoImagemService = TestBed.get(VariacaoImagemService);
    expect(service).toBeTruthy();
  });
});

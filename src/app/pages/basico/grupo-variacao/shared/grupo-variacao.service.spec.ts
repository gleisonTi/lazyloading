import { TestBed } from '@angular/core/testing';

import { GrupoVariacaoService } from './grupo-variacao.service';

describe('GrupoVariacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoVariacaoService = TestBed.get(GrupoVariacaoService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ReferenciaVariacaoService } from './referencia-variacao.service';

describe('ReferenciaVariacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenciaVariacaoService = TestBed.get(ReferenciaVariacaoService);
    expect(service).toBeTruthy();
  });
});

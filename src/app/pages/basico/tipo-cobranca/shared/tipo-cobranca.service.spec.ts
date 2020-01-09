import { TestBed } from '@angular/core/testing';

import { TipoCobrancaService } from './tipo-cobranca.service';

describe('TipoCobrancaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoCobrancaService = TestBed.get(TipoCobrancaService);
    expect(service).toBeTruthy();
  });
});

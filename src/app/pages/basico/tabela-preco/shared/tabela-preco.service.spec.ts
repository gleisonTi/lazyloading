import { TestBed } from '@angular/core/testing';

import { TabelaPrecoService } from './tabela-preco.service';

describe('TabelaPrecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TabelaPrecoService = TestBed.get(TabelaPrecoService);
    expect(service).toBeTruthy();
  });
});

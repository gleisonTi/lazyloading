import { TestBed } from '@angular/core/testing';

import { TipoContatoService } from './tipo-contato.service';

describe('TipoContatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoContatoService = TestBed.get(TipoContatoService);
    expect(service).toBeTruthy();
  });
});

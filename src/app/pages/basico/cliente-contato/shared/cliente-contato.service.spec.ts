import { TestBed } from '@angular/core/testing';

import { ClienteContatoService } from './cliente-contato.service';

describe('ClienteContatoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteContatoService = TestBed.get(ClienteContatoService);
    expect(service).toBeTruthy();
  });
});

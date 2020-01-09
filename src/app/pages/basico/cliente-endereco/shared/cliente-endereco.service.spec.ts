import { TestBed } from '@angular/core/testing';

import { ClienteEnderecoService } from './cliente-endereco.service';

describe('ClienteEnderecoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteEnderecoService = TestBed.get(ClienteEnderecoService);
    expect(service).toBeTruthy();
  });
});

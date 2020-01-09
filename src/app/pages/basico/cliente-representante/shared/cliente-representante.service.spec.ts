import { TestBed } from '@angular/core/testing';

import { ClienteRepresentanteService } from './cliente-representante.service';

describe('ClienteRepresentanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClienteRepresentanteService = TestBed.get(ClienteRepresentanteService);
    expect(service).toBeTruthy();
  });
});

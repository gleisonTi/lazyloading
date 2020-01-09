import { TestBed } from '@angular/core/testing';

import { ReferenciaAtributoService } from './referencia-atributo.service';

describe('ReferenciaAtributoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReferenciaAtributoService = TestBed.get(ReferenciaAtributoService);
    expect(service).toBeTruthy();
  });
});

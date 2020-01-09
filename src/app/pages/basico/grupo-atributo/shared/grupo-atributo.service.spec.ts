import { TestBed } from '@angular/core/testing';

import { GrupoAtributoService } from './grupo-atributo.service';

describe('GrupoAtributoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GrupoAtributoService = TestBed.get(GrupoAtributoService);
    expect(service).toBeTruthy();
  });
});

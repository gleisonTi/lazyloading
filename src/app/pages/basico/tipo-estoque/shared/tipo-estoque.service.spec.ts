import { TestBed } from '@angular/core/testing';

import { TipoEstoqueService } from './tipo-estoque.service';

describe('TipoEstoqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TipoEstoqueService = TestBed.get(TipoEstoqueService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { MovEstoqueService } from './mov-estoque.service';

describe('MovEstoqueService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovEstoqueService = TestBed.get(MovEstoqueService);
    expect(service).toBeTruthy();
  });
});

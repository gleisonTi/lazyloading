import { TestBed } from '@angular/core/testing';

import { MovEstoqueQtdeService } from './mov-estoque-qtde.service';

describe('MovEstoqueQtdeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MovEstoqueQtdeService = TestBed.get(MovEstoqueQtdeService);
    expect(service).toBeTruthy();
  });
});

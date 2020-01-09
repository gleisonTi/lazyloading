import { TestBed } from '@angular/core/testing';

import { ImagemService } from './imagem.service';

describe('ImagemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImagemService = TestBed.get(ImagemService);
    expect(service).toBeTruthy();
  });
});

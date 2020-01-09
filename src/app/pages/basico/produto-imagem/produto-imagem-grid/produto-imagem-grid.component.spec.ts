import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoImagemGridComponent } from './produto-imagem-grid.component';

describe('ProdutoImagemGridComponent', () => {
  let component: ProdutoImagemGridComponent;
  let fixture: ComponentFixture<ProdutoImagemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoImagemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoImagemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

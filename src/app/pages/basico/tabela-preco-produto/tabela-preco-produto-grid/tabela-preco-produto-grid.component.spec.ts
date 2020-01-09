import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaPrecoProdutoGridComponent } from './tabela-preco-produto-grid.component';

describe('TabelaPrecoProdutoGridComponent', () => {
  let component: TabelaPrecoProdutoGridComponent;
  let fixture: ComponentFixture<TabelaPrecoProdutoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabelaPrecoProdutoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabelaPrecoProdutoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

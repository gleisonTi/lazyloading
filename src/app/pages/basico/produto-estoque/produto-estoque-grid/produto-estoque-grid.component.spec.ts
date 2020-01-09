import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEstoqueGridComponent } from './produto-estoque-grid.component';

describe('ProdutoEstoqueGridComponent', () => {
  let component: ProdutoEstoqueGridComponent;
  let fixture: ComponentFixture<ProdutoEstoqueGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoEstoqueGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoEstoqueGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

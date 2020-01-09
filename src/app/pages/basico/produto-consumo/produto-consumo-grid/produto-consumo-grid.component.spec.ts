import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoConsumoGridComponent } from './produto-consumo-grid.component';

describe('ProdutoConsumoGridComponent', () => {
  let component: ProdutoConsumoGridComponent;
  let fixture: ComponentFixture<ProdutoConsumoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoConsumoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoConsumoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

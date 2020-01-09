import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoSkuGridComponent } from './produto-sku-grid.component';

describe('ProdutoSkuGridComponent', () => {
  let component: ProdutoSkuGridComponent;
  let fixture: ComponentFixture<ProdutoSkuGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoSkuGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoSkuGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

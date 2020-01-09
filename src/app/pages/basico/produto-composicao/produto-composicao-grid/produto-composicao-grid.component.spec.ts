import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoComposicaoGridComponent } from './produto-composicao-grid.component';

describe('ProdutoComposicaoGridComponent', () => {
  let component: ProdutoComposicaoGridComponent;
  let fixture: ComponentFixture<ProdutoComposicaoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoComposicaoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoComposicaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchProdutosComponent } from './search-produtos.component';

describe('SearchProdutosComponent', () => {
  let component: SearchProdutosComponent;
  let fixture: ComponentFixture<SearchProdutosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchProdutosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

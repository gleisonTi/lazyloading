import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoCategoriaGridComponent } from './produto-categoria-grid.component';

describe('ProdutoCategoriaGridComponent', () => {
  let component: ProdutoCategoriaGridComponent;
  let fixture: ComponentFixture<ProdutoCategoriaGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutoCategoriaGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoCategoriaGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

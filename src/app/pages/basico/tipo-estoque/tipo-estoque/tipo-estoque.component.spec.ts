import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoEstoqueComponent } from './tipo-estoque.component';

describe('TipoEstoqueComponent', () => {
  let component: TipoEstoqueComponent;
  let fixture: ComponentFixture<TipoEstoqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoEstoqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

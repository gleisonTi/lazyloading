import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovEstoqueQtdeGridComponent } from './mov-estoque-qtde-grid.component';

describe('MovEstoqueQtdeGridComponent', () => {
  let component: MovEstoqueQtdeGridComponent;
  let fixture: ComponentFixture<MovEstoqueQtdeGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovEstoqueQtdeGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovEstoqueQtdeGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

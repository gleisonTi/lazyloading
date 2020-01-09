import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovEstoqueGridComponent } from './mov-estoque-grid.component';

describe('MovEstoqueGridComponent', () => {
  let component: MovEstoqueGridComponent;
  let fixture: ComponentFixture<MovEstoqueGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovEstoqueGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovEstoqueGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

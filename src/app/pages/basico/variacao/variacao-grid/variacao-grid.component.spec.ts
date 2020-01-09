import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariacaoGridComponent } from './variacao-grid.component';

describe('VariacaoGridComponent', () => {
  let component: VariacaoGridComponent;
  let fixture: ComponentFixture<VariacaoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariacaoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariacaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

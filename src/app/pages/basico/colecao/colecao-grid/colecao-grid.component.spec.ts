import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColecaoGridComponent } from './colecao-grid.component';

describe('ColecaoGridComponent', () => {
  let component: ColecaoGridComponent;
  let fixture: ComponentFixture<ColecaoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColecaoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColecaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

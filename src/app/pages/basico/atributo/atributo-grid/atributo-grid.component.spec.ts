import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtributoGridComponent } from './atributo-grid.component';

describe('AtributoGridComponent', () => {
  let component: AtributoGridComponent;
  let fixture: ComponentFixture<AtributoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtributoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtributoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

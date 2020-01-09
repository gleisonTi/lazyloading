import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAtributoGridComponent } from './sub-atributo-grid.component';

describe('SubAtributoGridComponent', () => {
  let component: SubAtributoGridComponent;
  let fixture: ComponentFixture<SubAtributoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubAtributoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubAtributoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

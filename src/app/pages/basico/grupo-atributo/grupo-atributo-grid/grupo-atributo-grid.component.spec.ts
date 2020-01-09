import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoAtributoGridComponent } from './grupo-atributo-grid.component';

describe('GrupoAtributoGridComponent', () => {
  let component: GrupoAtributoGridComponent;
  let fixture: ComponentFixture<GrupoAtributoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoAtributoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoAtributoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

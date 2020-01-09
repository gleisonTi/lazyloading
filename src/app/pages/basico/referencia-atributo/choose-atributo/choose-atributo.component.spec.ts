import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseAtributoComponent } from './choose-atributo.component';

describe('ChooseAtributoComponent', () => {
  let component: ChooseAtributoComponent;
  let fixture: ComponentFixture<ChooseAtributoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseAtributoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseAtributoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

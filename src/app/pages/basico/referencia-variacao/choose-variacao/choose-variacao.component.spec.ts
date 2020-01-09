import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseVariacaoComponent } from './choose-variacao.component';

describe('ChooseVariacaoComponent', () => {
  let component: ChooseVariacaoComponent;
  let fixture: ComponentFixture<ChooseVariacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseVariacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseVariacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCobrancaComponent } from './tipo-cobranca.component';

describe('TipoCobrancaComponent', () => {
  let component: TipoCobrancaComponent;
  let fixture: ComponentFixture<TipoCobrancaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoCobrancaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoCobrancaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

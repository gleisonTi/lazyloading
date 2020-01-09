import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaVariacaoGridComponent } from './referencia-variacao-grid.component';

describe('ReferenciaVariacaoGridComponent', () => {
  let component: ReferenciaVariacaoGridComponent;
  let fixture: ComponentFixture<ReferenciaVariacaoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaVariacaoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaVariacaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

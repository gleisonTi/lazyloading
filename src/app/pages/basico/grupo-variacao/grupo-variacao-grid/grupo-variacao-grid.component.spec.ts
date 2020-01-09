import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrupoVariacaoGridComponent } from './grupo-variacao-grid.component';

describe('GrupoVariacaoGridComponent', () => {
  let component: GrupoVariacaoGridComponent;
  let fixture: ComponentFixture<GrupoVariacaoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrupoVariacaoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrupoVariacaoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

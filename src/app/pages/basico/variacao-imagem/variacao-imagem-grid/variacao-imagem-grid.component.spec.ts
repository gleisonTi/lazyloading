import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VariacaoImagemGridComponent } from './variacao-imagem-grid.component';

describe('VariacaoImagemGridComponent', () => {
  let component: VariacaoImagemGridComponent;
  let fixture: ComponentFixture<VariacaoImagemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VariacaoImagemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VariacaoImagemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContatoGridComponent } from './tipo-contato-grid.component';

describe('TipoContatoGridComponent', () => {
  let component: TipoContatoGridComponent;
  let fixture: ComponentFixture<TipoContatoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoContatoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoContatoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

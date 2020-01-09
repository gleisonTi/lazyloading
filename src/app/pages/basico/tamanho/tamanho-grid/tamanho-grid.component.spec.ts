import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TamanhoGridComponent } from './tamanho-grid.component';

describe('TamanhoGridComponent', () => {
  let component: TamanhoGridComponent;
  let fixture: ComponentFixture<TamanhoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TamanhoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TamanhoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmbalagemGridComponent } from './embalagem-grid.component';

describe('EmbalagemGridComponent', () => {
  let component: EmbalagemGridComponent;
  let fixture: ComponentFixture<EmbalagemGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmbalagemGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmbalagemGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

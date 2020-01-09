import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciaFormComponent } from './referencia-form.component';

describe('ReferenciaFormComponent', () => {
  let component: ReferenciaFormComponent;
  let fixture: ComponentFixture<ReferenciaFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenciaFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenciaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

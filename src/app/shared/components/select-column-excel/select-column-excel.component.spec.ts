import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectColumnExcelComponent } from './select-column-excel.component';

describe('SelectColumnExcelComponent', () => {
  let component: SelectColumnExcelComponent;
  let fixture: ComponentFixture<SelectColumnExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectColumnExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectColumnExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

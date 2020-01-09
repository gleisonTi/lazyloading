import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeFilterCellComponentComponent } from './date-range-filter-cell-component.component';

describe('DateRangeFilterCellComponentComponent', () => {
  let component: DateRangeFilterCellComponentComponent;
  let fixture: ComponentFixture<DateRangeFilterCellComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRangeFilterCellComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRangeFilterCellComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

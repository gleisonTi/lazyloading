import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownlistFilterComponent } from './dropdownlist-filter.component';

describe('DropdownlistFilterComponent', () => {
  let component: DropdownlistFilterComponent;
  let fixture: ComponentFixture<DropdownlistFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownlistFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownlistFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

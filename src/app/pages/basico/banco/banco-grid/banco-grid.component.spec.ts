import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BancoGridComponent } from './banco-grid.component';

describe('BancoGridComponent', () => {
  let component: BancoGridComponent;
  let fixture: ComponentFixture<BancoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BancoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BancoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

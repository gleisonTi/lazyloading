import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MktplaceComponent } from './mktplace.component';

describe('MktplaceComponent', () => {
  let component: MktplaceComponent;
  let fixture: ComponentFixture<MktplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MktplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MktplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

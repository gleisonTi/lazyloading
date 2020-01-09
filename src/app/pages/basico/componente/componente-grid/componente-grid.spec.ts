import { ComponenteGridComponent } from './component-grid.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

describe('SetorGridComponent', () => {
  let component: ComponenteGridComponent;
  let fixture: ComponentFixture<ComponenteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponenteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponenteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

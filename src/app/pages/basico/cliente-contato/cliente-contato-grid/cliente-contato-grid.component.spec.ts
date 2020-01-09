import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteContatoGridComponent } from './cliente-contato-grid.component';

describe('ClienteContatoGridComponent', () => {
  let component: ClienteContatoGridComponent;
  let fixture: ComponentFixture<ClienteContatoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteContatoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteContatoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteRepresentanteGridComponent } from './cliente-representante-grid.component';

describe('ClienteRepresentanteGridComponent', () => {
  let component: ClienteRepresentanteGridComponent;
  let fixture: ComponentFixture<ClienteRepresentanteGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteRepresentanteGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteRepresentanteGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

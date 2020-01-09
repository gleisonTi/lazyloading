import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClienteEnderecoGridComponent } from './cliente-endereco-grid.component';

describe('ClienteEnderecoGridComponent', () => {
  let component: ClienteEnderecoGridComponent;
  let fixture: ComponentFixture<ClienteEnderecoGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClienteEnderecoGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClienteEnderecoGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

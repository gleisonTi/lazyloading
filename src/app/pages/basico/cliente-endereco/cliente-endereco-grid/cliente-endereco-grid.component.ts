import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClienteEndereco } from '../shared/cliente-endereco.model';
import { Cliente } from '../../cliente/shared/cliente.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteEnderecoService } from '../shared/cliente-endereco.service';
import { map } from 'rxjs/operators';
import { ClienteService } from '../../cliente/shared/cliente.service';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Component({
  selector: 'incca-cliente-endereco-grid',
  templateUrl: './cliente-endereco-grid.component.html',
  styleUrls: ['./cliente-endereco-grid.component.scss']
})
export class ClienteEnderecoGridComponent extends BaseResourceGridComponent<ClienteEndereco> implements OnInit {

  public createFormGroup: FormGroup;
  public openedCadCliente = false;

  public isNew: boolean;
  public columns: any[] = [
    { field: 'ClienteEnderecoCep', title: 'Cep' },
    { field: 'ClienteEndereco', title: 'Endereço' },
    { field: 'ClienteEnderecoTipo', title: 'Tipo' },
    { field: 'ClienteEnderecoCidade', title: 'Cidade' },
  ];

  @Input() clienteId: string
  @Input() tipoCliente: boolean
  @Input() isNewCliente: boolean
  public clienteEnderecoList: ClienteEndereco[] = [];
  public viewArrayEndereco?: Observable<GridDataResult>;

  formGroup: FormGroup
  constructor(
    protected injector: Injector,
    protected clienteEnderecoService: ClienteEnderecoService,
    protected clienteService: ClienteService,
  ) {
    super(injector, new ClienteEndereco(), clienteEnderecoService, createFormGroup)
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ClienteEndereco').subscribe(res => this.helpList = res)
    this.resourceService.read(this.gridState, this.clienteId)
    this.view = this.resourceService.pipe(map(res => { return res; }));
    this.clienteService.data.subscribe(res => {
      this.clienteEnderecoList = res;
      if (res.length && this.isNewCliente) {
        this.clienteEnderecoService.next({ total: this.clienteEnderecoList.length, data: this.clienteEnderecoList });
      }
    });

  }
  public removeHandler({dataItem, rowIndex}) {
    if (this.isNew) {
        this.clienteService.removeClienteEndereco(rowIndex);
    } else {
      this.resource = ClienteEndereco.fromJson(dataItem);
      this.resourceService.remove(this.resource)
    }
    ;
  }

  public close() {
    this.openedCadCliente = false;
  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
      this.createFormGroup.get('ClienteId').setValue(this.clienteId)
    }
    this.isNew = isNew;
    this.openedCadCliente = true;
  }

  getFormGroupForm(formData: FormData) {
    this.close();
  }

  public closeWindow(e) {
    this.openedCadCliente = e;



  }
  public updateGrid(e) {

    this.resourceService.read(this.gridState, this.clienteId);
  }
}

const createFormGroup = (dataItem?: ClienteEndereco) => {

  if (dataItem) {
    return new FormGroup({
      ClienteId: new FormControl(dataItem.ClienteId),
      ClienteEnderecoId: new FormControl(dataItem.ClienteEnderecoId),
      ClienteEndereco: new FormControl(dataItem.ClienteEndereco, Validators.required),
      ClienteEnderecoBairro: new FormControl(dataItem.ClienteEnderecoBairro, Validators.required),
      ClienteEnderecoCNPJ: new FormControl(dataItem.ClienteEnderecoCNPJ),
      ClienteEnderecoCPF: new FormControl(dataItem.ClienteEnderecoCPF),
      ClienteEnderecoCep: new FormControl(dataItem.ClienteEnderecoCep, Validators.required),
      ClienteEnderecoCidade: new FormControl(dataItem.ClienteEnderecoCidade, Validators.required),
      ClienteEnderecoCodigoMunicipio: new FormControl(dataItem.ClienteEnderecoCodigoMunicipio),
      ClienteEnderecoComplemento: new FormControl(dataItem.ClienteEnderecoComplemento),
      ClienteEnderecoInscricaoEstadual: new FormControl(dataItem.ClienteEnderecoInscricaoEstadual),
      ClienteEnderecoNumero: new FormControl(dataItem.ClienteEnderecoNumero, [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteEnderecoPadrao: new FormControl(dataItem.ClienteEnderecoPadrao),
      ClienteEnderecoPais: new FormControl(dataItem.ClienteEnderecoPais, Validators.required),
      ClienteEnderecoSequencia: new FormControl(dataItem.ClienteEnderecoSequencia, Validators.required),
      ClienteEnderecoTelefone: new FormControl(dataItem.ClienteEnderecoTelefone),
      ClienteEnderecoTipo: new FormControl(dataItem.ClienteEnderecoTipo, Validators.required),
      ClienteEnderecoUF: new FormControl(dataItem.ClienteEnderecoUF, Validators.required),
    }
    )
  } else {
    return new FormGroup({
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteEnderecoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteEndereco: new FormControl('', Validators.required),
      ClienteEnderecoBairro: new FormControl('', Validators.required),
      ClienteEnderecoCNPJ: new FormControl(''),
      ClienteEnderecoCPF: new FormControl(''),
      ClienteEnderecoCep: new FormControl('', Validators.required),
      ClienteEnderecoCidade: new FormControl('', Validators.required),
      ClienteEnderecoCodigoMunicipio: new FormControl(''),
      ClienteEnderecoComplemento: new FormControl(''),
      ClienteEnderecoInscricaoEstadual: new FormControl(''),
      ClienteEnderecoNumero: new FormControl('', Validators.required),
      ClienteEnderecoPadrao: new FormControl(false),
      ClienteEnderecoPais: new FormControl('', Validators.required),
      ClienteEnderecoSequencia: new FormControl('', Validators.required),
      ClienteEnderecoTelefone: new FormControl('', Validators.required),
      ClienteEnderecoTipo: new FormControl('', Validators.required),
      ClienteEnderecoUF: new FormControl('', Validators.required),
    })
  }
}

export const createFormClienteEndereco = createFormGroup;

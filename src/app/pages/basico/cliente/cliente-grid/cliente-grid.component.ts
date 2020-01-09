import { Component, OnInit, Injector } from '@angular/core';
import { Cliente } from '../shared/cliente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../shared/cliente.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';

@Component({
  selector: 'incca-cliente-grid',
  templateUrl: './cliente-grid.component.html',
  styleUrls: ['./cliente-grid.component.scss']
})
export class ClienteGridComponent extends BaseResourceGridComponent<Cliente> implements OnInit {

  public createFormGroupAgenda: FormGroup;
  public createFormGroupLocal: FormGroup;
  public createFormGroup: FormGroup;
  public openedCadCliente = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: 'ClienteCodigo', title: 'Codigo' },
    { field: 'ClienteNome', title: 'Nome' },
    { field: 'ClienteNomeFantasia', title: 'Sobrenome / Nome Fantasia' },
    { field: 'ClienteTelefone', title: 'Telefone' },
    { field: 'ClienteEmail', title: 'Email' },
  ];
  public clienteList: Cliente[] = [];

  constructor(
    protected injector: Injector,
    public clienteService: ClienteService,
  ) {
    super(injector, new Cliente(), clienteService, createFormGroup);
  }

  ngOnInit() {
    super.ngOnInit();
    this.clienteService.getAll().subscribe(res => { this.clienteList = res.data; console.log(res); });

  }

  public getName(dataItem: Cliente, col: string): string {
    if (col === 'GrupoId') {
      return this.clienteList.length !== 0 ? this.clienteList.find(item =>
        item.ClienteId === dataItem.ClienteId).ClienteNome : 'carregando';
    }
  }

  public removeHandler({ dataItem }) {
    this.resource = Cliente.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public close() {
    this.openedCadCliente = false;
  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadCliente = true;
  }

  getFormGroupForm(formData: FormData) {
    this.close();
  }

}

const createFormGroup = (dataItem?: Cliente) => {
  if (dataItem) {
    return new FormGroup({
      ClienteId: new FormControl(dataItem.ClienteId),
      ClienteCodigo: new FormControl(dataItem.ClienteCodigo, [Validators.pattern(/^-?([0-9]\d*)?$/), Validators.required]),
      ClienteNome: new FormControl(dataItem.ClienteNome, Validators.required),
      ClienteTipoCliente: new FormControl(dataItem.ClienteTipoCliente === 'J' ? true : false),
      ClienteTipoFornecedor: new FormControl(dataItem.ClienteTipoFornecedor),
      ClienteTipoTransportadora: new FormControl(dataItem.ClienteTipoTransportadora),
      ClienteTipoRepresentante: new FormControl(dataItem.ClienteTipoRepresentante),
      ClienteTipoPessoa: new FormControl(dataItem.ClienteTipoPessoa),
      ClienteTipoOutros: new FormControl(dataItem.ClienteTipoOutros),
      ClienteTelefone: new FormControl(dataItem.ClienteTelefone, [Validators.required]),
      ClienteCelular: new FormControl(dataItem.ClienteCelular, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCodigoSuframa: new FormControl(dataItem.ClienteCodigoSuframa, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCNPJ: new FormControl(dataItem.ClienteCNPJ, Validators.required),
      ClienteCPF: new FormControl(dataItem.ClienteCPF, Validators.required),
      ClienteInscricaoEstadual: new FormControl(dataItem.ClienteInscricaoEstadual),
      ClienteInscricaoMunicipal: new FormControl(dataItem.ClienteInscricaoMunicipal),
      ClienteTransportadoraId: new FormControl(dataItem.ClienteTransportadoraId),
      ClienteNomeFantasia: new FormControl(dataItem.ClienteNomeFantasia, Validators.required),
      ClienteEmail: new FormControl(dataItem.ClienteEmail, [Validators.required, Validators.email]),
      ClienteEmailNfe: new FormControl(dataItem.ClienteEmailNfe, [Validators.required, Validators.email]),
      ClienteDataCadastro: new FormControl(dataItem.ClienteDataCadastro),
      ClienteCodigoContabil: new FormControl(dataItem.ClienteCodigoContabil),
      ClienteLimiteCredito: new FormControl(dataItem.ClienteLimiteCredito),
      ClienteTipoFrete: new FormControl(dataItem.ClienteTipoFrete),
      ClienteBancoId: new FormControl(dataItem.ClienteBancoId),
      ClienteCondicaoPagamentoId: new FormControl(dataItem.ClienteCondicaoPagamentoId),
      ClienteAreaId: new FormControl(dataItem.ClienteAreaId, Validators.required),
      ClienteAtivo: new FormControl(dataItem.ClienteAtivo),
      ClienteTipoCobrancaId: new FormControl(dataItem.ClienteTipoCobrancaId),
      ClienteDespesaId: new FormControl(dataItem.ClienteDespesaId),
      ClienteNotePad: new FormControl(dataItem.ClienteNotePad),
      ClienteGenero: new FormControl(dataItem.ClienteGenero),
    }
    );
  } else {
    return new FormGroup({
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteCodigo: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/), Validators.required]),
      ClienteNome: new FormControl('', Validators.required),
      ClienteTipoCliente: new FormControl(''),
      ClienteTipoFornecedor: new FormControl(false),
      ClienteTipoTransportadora: new FormControl(false),
      ClienteTipoRepresentante: new FormControl(false),
      ClienteTipoPessoa: new FormControl(false),
      ClienteTipoOutros: new FormControl(false),
      ClienteTelefone: new FormControl('', [Validators.required]),
      ClienteCelular: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCodigoSuframa: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCNPJ: new FormControl('', Validators.required),
      ClienteCPF: new FormControl('', Validators.required),
      ClienteInscricaoEstadual: new FormControl(''),
      ClienteInscricaoMunicipal: new FormControl(''),
      ClienteTransportadoraId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteNomeFantasia: new FormControl('', Validators.required),
      ClienteEmail: new FormControl('', Validators.required),
      ClienteEmailNfe: new FormControl('', Validators.required),
      ClienteDataCadastro: new FormControl(''),
      ClienteCodigoContabil: new FormControl(''),
      ClienteLimiteCredito: new FormControl(''),
      ClienteTipoFrete: new FormControl(''),
      ClienteBancoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteCondicaoPagamentoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteAreaId: new FormControl('', Validators.required),
      ClienteAtivo: new FormControl(false),
      ClienteTipoCobrancaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteDespesaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteNotePad: new FormControl(''),
      ClienteGenero: new FormControl('M'),
    });
  }
};

import { Cliente } from './../../cliente/shared/cliente.model'
import { Component, OnInit, Injector } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Agenda } from '../shared/agenda.model'
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component'
import { AgendaService } from '../shared/agenda.service'
import { ClienteService } from '../../cliente/shared/cliente.service'


@Component({
  selector: 'incca-agenda-grid',
  templateUrl: './agenda-grid.component.html',
  styleUrls: ['./agenda-grid.component.scss']
})

export class AgendaGridComponent extends BaseResourceGridComponent<Agenda> implements OnInit {

  public createFormGroupAgenda: FormGroup
  public createFormGroup: FormGroup
  public openedCadClientes: boolean = false
  public openedCadAgendamento: boolean = false
  public clienteList: Cliente[] = []
  public isNew: boolean

  public AgendaTipoContato: Array<{ AgendaTipoContato: number, descricao: string }> = [
    { AgendaTipoContato: 0, descricao: 'Aplicativo' },
    { AgendaTipoContato: 2, descricao: 'Telefone/Whatsapp' },
    { AgendaTipoContato: 4, descricao: 'Email' },
    { AgendaTipoContato: 6, descricao: 'Visita' },
  ]

  public AgendaSituacao: Array<{ AgendaSituacao: number, descricao: string }> = [
    { AgendaSituacao: 0, descricao: 'Em aberto' },
    { AgendaSituacao: 2, descricao: 'Aguardando posição do cliente' },
    { AgendaSituacao: 4, descricao: 'Finalizado' },
    { AgendaSituacao: 6, descricao: 'Pedido' },
    { AgendaSituacao: 8, descricao: 'Recusado' },
  ]

  constructor(protected injector: Injector,
    protected agendaService: AgendaService,
    public clienteService: ClienteService,
  ) {
    super(injector, new Agenda(), agendaService, createFormGroupAgenda)
  }

  ngOnInit(): void {
    super.ngOnInit()
    this.clienteService.getAll().subscribe(res => { this.clienteList = res.data })
  }

  public getNomeCliente(clienteId: string): string {
    if (this.clienteList.length > 0)
      return this.clienteList.find((item) => (item.ClienteId === clienteId)).ClienteNome
  }

  public getTipoContato(tipoContatoId: number): string {
    return this.AgendaTipoContato.find((item) => (item.AgendaTipoContato === tipoContatoId)).descricao
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Agenda.fromJson(formGroup.value)
    this.resourceService.save(this.resource, isNew)
    sender.closeRow(rowIndex)
  }

  public removeHandler({ dataItem }) {
    this.resource = Agenda.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public open({ isNew }) {

    this.createFormGroup = createFormGroupCliente(); // insert
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadClientes = true;
  }

  public close() {
    this.openedCadClientes = false;
  }

}

const createFormGroupAgenda = (dataItem?: Agenda) => {
  if (dataItem) {
    return new FormGroup({
      AgendaId: new FormControl(dataItem.AgendaId),
      ClienteCelular: new FormControl(dataItem.ClienteCelular),
      AgendaUsuarioAlteracaoCadastro: new FormControl(dataItem.AgendaUsuarioAlteracaoCadastro),
      ClienteEmail: new FormControl(dataItem.ClienteEmail),
      ClienteId: new FormControl(dataItem.ClienteId, Validators.required),
      AgendaObservacao: new FormControl(dataItem.AgendaObservacao),
      AgendaSituacao: new FormControl(dataItem.AgendaSituacao, Validators.required),
      AgendaData: new FormControl(dataItem.AgendaData, Validators.required),
      AgendaDataAlteracaoCadastro: new FormControl(dataItem.AgendaDataAlteracaoCadastro),
      AgendaDataProximoContato: new FormControl(dataItem.AgendaDataProximoContato),
      AgendaTipoContato: new FormControl(dataItem.AgendaTipoContato, Validators.required)
    })
  } else {
    return new FormGroup({
      AgendaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AgendaUsuarioAlteracaoCadastro: new FormControl(''),
      ClienteCelular: new FormControl(''),
      ClienteEmail: new FormControl(''),
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AgendaObservacao: new FormControl(''),
      FabricanteUsuario: new FormControl(''),
      AgendaSituacao: new FormControl(0, Validators.required),
      AgendaData: new FormControl(new Date(), [Validators.required]),
      AgendaDataAlteracaoCadastro: new FormControl(new Date(), [Validators.required]),
      AgendaDataProximoContato: new FormControl(new Date(), [Validators.required]),
      AgendaTipoContato: new FormControl('')
    })
  }
}

const createFormGroupCliente = (dataItem?: Cliente) => {
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
      ClienteEmail: new FormControl(dataItem.ClienteEmail, Validators.required),
      ClienteEmailNfe: new FormControl(dataItem.ClienteEmailNfe, Validators.required),
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
}

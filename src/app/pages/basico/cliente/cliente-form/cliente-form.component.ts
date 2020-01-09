import { Component, OnInit, OnDestroy, DoCheck, Input } from '@angular/core';
import { Cliente } from '../shared/cliente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../shared/cliente.service';
import { map } from 'rxjs/operators';
import { ReferenciaRoutingModule } from '../../referencia/referencia-routing.module';
import { BancoService } from '../../banco/shared/banco.service';
import { AreaService } from '../../area/shared/area.service';
import { DespesaService } from '../../despesa/shared/despesa.service';
import { TipoCobrancaService } from '../../tipo-cobranca/shared/tipo-cobranca.service';
import { CondicaoPagamentoService } from '../../condicao-pagamento/shared/condicao-pagamento.service';
import { Banco } from '../../banco/shared/banco.model';
import { Area } from '../../area/shared/area.model';
import { Despesa } from '../../despesa/shared/despesa.model';
import { CondicaoPagamento } from '../../condicao-pagamento/shared/condicao-pagamento.model';
import { TipoCobranca } from '../../tipo-cobranca/shared/tipo-cobranca.model';
import { GlobalService } from 'src/app/shared/services/global.sevice';
import { ClienteEndereco } from '../../cliente-endereco/shared/cliente-endereco.model';
import { ClienteEnderecoService } from '../../cliente-endereco/shared/cliente-endereco.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { createFormClienteEndereco } from '../../cliente-endereco/cliente-endereco-grid/cliente-endereco-grid.component';

@Component({
  selector: 'incca-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.scss'],
  providers: [BancoService, AreaService, DespesaService, TipoCobrancaService, CondicaoPagamentoService, GlobalService, ClienteEnderecoService]
})

export class ClienteFormComponent implements OnInit, OnDestroy, DoCheck {

  public inativo = false;
  public dataCliente: Cliente[];
  public dataTrasportadora: Cliente[];
  public clienteList: Cliente[];
  public hasClienteCod = false;
  public clienteId = '';
  public tipoCliente: boolean; // define se o cliente e fisico(false) ou juridico(true)
  @Input() public isNew  : boolean;
  @Input() public formGroup: FormGroup;
  public created = false;

  // dropdowns list
  public bancoList: Banco[];
  public areaList: Area[];
  public despesaList: Despesa[];
  public condicaoPagamentoList: CondicaoPagamento[];
  public tipoCobrancaList: TipoCobranca[];
  // mascaras
  public maskCPF = '000.000.000-00';
  public maskCNPJ = '00.000.000/0000-00';
  public maskTelefone = '(00) 0000-0000 ';
  public maskCelular = '(00) 00000-0000';
  public enderecoClienteByCnpj: any;


  public FreteList: Array<{ value: string, descricao: string }
  > = [
      { value: 'cif', descricao: 'C.I.F - Frete e seguros pagos pelo fornecedor' },
      { value: 'fob', descricao: 'F.O.B - Frete e seguros pagos pelo cliente' },
      { value: 'cfr', descricao: 'C.F.R - Cortesia' },
    ];
  constructor(
    public clienteService: ClienteService,
    public bancoService: BancoService,
    public areaService: AreaService,
    public loadingService: LoadingService,
    public tipoCobrancaService: TipoCobrancaService,
    public despesaService: DespesaService,
    public globalService: GlobalService, // busca dados por CNPJ
    public condicaoPagamentoService: CondicaoPagamentoService,
    public clienteEnderecoService: ClienteEnderecoService,
  ) {
  }

  get loading() {
    return this.loadingService.isLoading();
  }
  ngOnInit() {

    this.bancoService.getAll().subscribe(res => this.bancoList = res.data ? res.data : []);
    this.areaService.getAll().subscribe(res => {
      this.areaList = res.data ? res.data : [];
    });
    this.despesaService.getAll().subscribe(res => this.despesaList = res.data ? res.data : []);
    this.condicaoPagamentoService.getAll().subscribe(res => this.condicaoPagamentoList = res.data ? res.data : []);
    this.tipoCobrancaService.getAll().subscribe(res => this.tipoCobrancaList = res.data ? res.data : []);

    this.clienteId = this.formGroup.value.ClienteId;
    this.tipoCliente = this.formGroup.value.ClienteTipoCliente;
    this.updateValidators(this.tipoCliente);

    this.clienteService.getAll().subscribe(res => { this.clienteList = res.data; this.dataCliente = res.data; });
    this.clienteService.getAll().pipe(map((res) => {
      return res.data ? res.data.filter((item: Cliente) => item.ClienteTipoTransportadora === true) : [];
    })).subscribe(res => this.dataTrasportadora = res);
    if (this.isNew) {
      this.clienteService.getNewCodigoCliente().subscribe(res => {
        this.formGroup.get('ClienteCodigo').setValue(res.Codigo);
        this.formGroup.get('ClienteCodigoContabil').setValue(res.Codigo);
      });
    }
  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
    this.clienteService.clearClienteEndereco(); // limpa array de endereços ao fechar o cliente-form
  }

  ngDoCheck(): void {
    // para edição da Cliente
    if (this.formGroup.value.ClienteId !== '00000000-0000-0000-0000-000000000000') {
      this.clienteId = this.formGroup.value.ClienteId;
    }
  }

  salvarDados() {
    let referencia: Cliente = Cliente.fromJson(this.formGroup.value);
    referencia.ClienteTipoCliente = referencia.ClienteTipoCliente ? 'J' : 'F'; // troca de boleano para caractere antes de salvar
    this.clienteService.save(referencia, this.isNew).subscribe(res => {
      if (this.isNew && this.tipoCliente) {// se for novo e o cliente for juridico
        this.salvaEndereco(res);
      }
      this.isNew = false;
      this.clienteId = res.ClienteId;
      this.created = true;
    });
  }

  salvaEndereco(cliente: Cliente) {
    this.globalService.getAddresData(this.enderecoClienteByCnpj.cep).subscribe(res => {
      const clienteEndereco = new ClienteEndereco( // cria endereco padrão a partir do cep do cnpj
        '00000000-0000-0000-0000-000000000000',
        cliente.ClienteId, 'END', '1',
        true, res.cep, res.logradouro,
        this.enderecoClienteByCnpj.numero,
        this.enderecoClienteByCnpj.complemento,
        res.bairro, res.localidade, res.uf, 'Brasil', res.ibge,
        this.enderecoClienteByCnpj.cnpj, '', this.formGroup.value.ClienteInscricaoEstadual,
        this.enderecoClienteByCnpj.telefone
      );
      this.clienteEnderecoService.save(clienteEndereco, true).subscribe(() => console.log('Endereço Criado'));
      this.clienteEnderecoService.read(null, cliente.ClienteId);
    });
  }

  focusOutFunction(e: string, col: string) {
    switch (col) {
      case 'codigo':
        if (this.isNew && parseInt(e)) {
          this.clienteService.checkCodProduto('cliente', e).subscribe(res => {
            this.hasClienteCod = res.contains;
          });
        }
        break;
      case 'cnpj':
        if (this.isNew && this.tipoCliente) {
          this.globalService.getCnpjData(e).subscribe(res => {
            this.enderecoClienteByCnpj = res; //  salva o endereco pesquisado
            this.formGroup.get('ClienteNome').setValue(res.nome);
            this.formGroup.get('ClienteNomeFantasia').setValue(res.fantasia);
            const tell: string = res.telefone;
            this.formGroup.get('ClienteTelefone').setValue(tell.replace(/\s/g, ''));
            this.formGroup.get('ClienteEmail').setValue(res.email);
          });

        }
        break;

      default:
        break;
    }

  }

  changeTipoCliente(e) {
    this.formGroup.get('ClienteTipoCliente').setValue(e);
    this.updateValidators(e);
    this.tipoCliente = this.formGroup.value.ClienteTipoCliente;
  }

  updateValidators(tipoCliente: boolean) {
    if (tipoCliente) {
      this.formGroup.get('ClienteCPF').clearValidators();
      this.formGroup.get('ClienteCPF').updateValueAndValidity();
    } else {
      this.formGroup.get('ClienteCNPJ').clearValidators();
      this.formGroup.get('ClienteCNPJ').updateValueAndValidity();
    }
  }
  selecionaGenero(e) {
    if (e.target.value === 'Masculino') {
      this.formGroup.get('ClienteGenero').setValue('M');
    } else {
      this.formGroup.get('ClienteGenero').setValue('F');
    }
  }
  testadados() {
    //  this.globalService.getCnpjData('1212').subscribe(res => console.log(res))
  }

}
// createform utilizado para limpar os campos o principal esta no componente grid.
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
      ClienteTelefone: new FormControl(dataItem.ClienteTelefone),
      ClienteCelular: new FormControl(dataItem.ClienteCelular, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCodigoSuframa: new FormControl(dataItem.ClienteCodigoSuframa, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCNPJ: new FormControl(dataItem.ClienteCNPJ),
      ClienteCPF: new FormControl(dataItem.ClienteCPF),
      ClienteInscricaoEstadual: new FormControl(dataItem.ClienteInscricaoEstadual),
      ClienteInscricaoMunicipal: new FormControl(dataItem.ClienteInscricaoMunicipal),
      ClienteTransportadoraId: new FormControl(dataItem.ClienteTransportadoraId),
      ClienteNomeFantasia: new FormControl(dataItem.ClienteNomeFantasia),
      ClienteEmail: new FormControl(dataItem.ClienteEmail),
      ClienteEmailNfe: new FormControl(dataItem.ClienteEmailNfe),
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
      ClienteTelefone: new FormControl(''),
      ClienteCelular: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCodigoSuframa: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteCNPJ: new FormControl(''),
      ClienteCPF: new FormControl(''),
      ClienteInscricaoEstadual: new FormControl(''),
      ClienteInscricaoMunicipal: new FormControl(''),
      ClienteTransportadoraId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteNomeFantasia: new FormControl(''),
      ClienteEmail: new FormControl(''),
      ClienteDataCadastro: new FormControl(''),
      ClienteCodigoContabil: new FormControl(0),
      ClienteLimiteCredito: new FormControl(0),
      ClienteTipoFrete: new FormControl(''),
      ClienteBancoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteCondicaoPagamentoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteAreaId: new FormControl('', Validators.required),
      ClienteAtivo: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteTipoCobrancaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteDespesaId: new FormControl('0'),
      ClienteNotePad: new FormControl(''),
      ClienteGenero: new FormControl(''),
    });
  }
};

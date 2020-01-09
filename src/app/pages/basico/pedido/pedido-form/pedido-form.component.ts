import { SearchProdutosService } from './../../../../shared/components/search-produtos/shared/search-produtos.service';
import { Subscription } from 'rxjs/Subscription';
import { Produto } from './../../produto/shared/produto.model';
import { Component, OnInit, Input, OnChanges, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pedido } from '../shared/pedido.model';
import { PedidoService } from '../shared/pedido.service';
import { TipoCobrancaService } from '../../tipo-cobranca/shared/tipo-cobranca.service';
import { TipoCobranca } from '../../tipo-cobranca/shared/tipo-cobranca.model';
import { ClienteService } from '../../cliente/shared/cliente.service';
import { Cliente } from '../../cliente/shared/cliente.model';
import { PedidoComissaoService } from '../../pedido-comissao/shared/pedido-comissao.service';
import { ClienteEnderecoService } from '../../cliente-endereco/shared/cliente-endereco.service';
import { ClienteEndereco } from '../../cliente-endereco/shared/cliente-endereco.model';
import { CondicaoPagamento } from '../../condicao-pagamento/shared/condicao-pagamento.model';
import { CondicaoPagamentoService } from '../../condicao-pagamento/shared/condicao-pagamento.service';
import { TabelaPreco } from '../../tabela-preco/shared/tabela-preco.model';
import { TabelaPrecoService } from '../../tabela-preco/shared/tabela-preco.service';
import { PedidoItemService } from '../../pedido-item/shared/pedido-item.service';
import { v4 as uuid } from 'uuid'; // gera Guid
import { ClienteRepresentanteService } from '../../cliente-representante/shared/cliente-representante.service';
import { map } from 'rxjs/operators';
import { ClienteRepresentante } from '../../cliente-representante/shared/cliente-representante.model';
import { PedidoComissao } from '../../pedido-comissao/shared/pedido-comissao.model';
import { PedidoItemComissao } from '../../pedido-item-comissao/shared/pedido-item-comissao.model';
import { LoadingService } from 'src/app/shared/services/loading.service';
import { TabStripComponent } from '@progress/kendo-angular-layout';
import { ToastrService } from 'ngx-toastr';
import { bloomAdd } from '@angular/core/src/render3/di';
import { ParametroService } from '../../parametro/shared/parametro.service';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { ProdutoService } from '../../produto/shared/produto.service';
import { pedidoItemForm } from '../../pedido-item/pedido-item-grid/pedido-item-grid.component';
import { PedidoItem } from '../../pedido-item/shared/pedido-item.model';
import { IdService } from '@progress/kendo-angular-grid';
import { MapType } from '@angular/compiler';
@Component({
  selector: 'incca-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit, OnDestroy {

  @ViewChild('kendoTab') kendoTab: TabStripComponent; // manipulação das abas

  public hasPedidoCod = false;
  public pedidoId = '00000000-0000-0000-0000-000000000000';
  public openedFinalPedido: boolean;
  public containItens = true; /// Verifica se o pedido foi criado com itens
  public isNewForOpemPedido: boolean;
  public formGroupPedidoItem: FormGroup = pedidoItemForm();
  // paramentro de comissão do vendedor
  @Input() public tipoComissao: string;
  public PedidoSenhaVendedor = new FormControl('', [Validators.required]); // formcontrol isolado do formgroup

  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  @Output() public opemNewPedido = new EventEmitter<boolean>();
  public created = false;
  public tabelaPreco = ''; // id da tabela de preço que sera passada para Pedido Item para definir o valor dos produtos
  public tabelaPrecos: TabelaPreco[];
  public showPesquisa: boolean = false;
  public mktlist: Array<{ MktPlaceId: String, descricao: string }> = [
    { MktPlaceId: 'B2W', descricao: 'B2W' },
    { MktPlaceId: 'DAFITI', descricao: 'DAFITI' },
    { MktPlaceId: 'IRROBA', descricao: 'IRROBA' },
    { MktPlaceId: 'LOJAINTEGRADA', descricao: 'LOJA INTEGRADA' },
    { MktPlaceId: 'MAGAZINELUIZA', descricao: 'MAGAZINE LUIZA' },
    { MktPlaceId: 'MERCADOLIVRE', descricao: 'MERCADO LIVRE' },
    { MktPlaceId: 'NETSHOES', descricao: 'NETSHOES' },
    { MktPlaceId: '', descricao: 'SEM MARKETPLACE' },

  ];
  public tipoRepresentantelist: Array<{ PedidoComissaoTipoRepresentante: string, descricao: string }> = [
    { PedidoComissaoTipoRepresentante: 'rep1', descricao: 'Representante 1 ' },
    { PedidoComissaoTipoRepresentante: 'rep2', descricao: 'Representante 2' },
    { PedidoComissaoTipoRepresentante: 'sup', descricao: 'Supervisor' },
    { PedidoComissaoTipoRepresentante: 'gerR', descricao: 'Gerente Regional' },

  ];
  public FreteList: Array<{ PedidoTipoFrete: string, descricao: string }> = [
    { PedidoTipoFrete: 'cif', descricao: 'C.I.F - Frete e seguros pagos pelo fornecedor' },
    { PedidoTipoFrete: 'fob', descricao: 'F.O.B - Frete e seguros pagos pelo cliente' },
    { PedidoTipoFrete: 'cfr', descricao: 'C.F.R - Cortesia' },
  ];
  public tipoEntregaList: Array<{ PedidoTipoEntrega: string, descricao: string }> = [
    { PedidoTipoEntrega: 'sed', descricao: 'Sedex' },
    { PedidoTipoEntrega: 'pac', descricao: 'Pac' },
    { PedidoTipoEntrega: 'rna', descricao: 'Retire Na Loja' },
    { PedidoTipoEntrega: 'meg', descricao: 'Moto Entrega' },
  ];

  public tipoPedidoList: Array<{ PedidoTipoPedido: number, descricao: string }> = [
    { PedidoTipoPedido: 6, descricao: 'Orçamento' },
    { PedidoTipoPedido: 4, descricao: 'Venda' },
    { PedidoTipoPedido: 1, descricao: 'Consignação' },
    { PedidoTipoPedido: 5, descricao: 'Cancelado' },
  ];
  public tipobrancaList: TipoCobranca[];
  public condicaoPagamentoList: CondicaoPagamento[];
  public clienteList: Cliente[];
  public clienteData: Cliente[];
  public trasportadoraList: Cliente[];
  public trasportadoraData: Cliente[];
  public representanteList: Cliente[];
  public representanteData: Cliente[];
  public totalPedido: number; //  total do pedido
  public cliente: Cliente;
  public clienteEndereco: ClienteEndereco;
  public trasportadora: Cliente;
  public representante: Cliente;
  public tipoPedido = 'revenda';
  public pedidoItem: PedidoItem;

  constructor(
    public pedidoService: PedidoService,
    public tipoCobrancaService: TipoCobrancaService,
    public clienteService: ClienteService,
    public loadingService: LoadingService,
    public parametroService: ParametroService,
    public pedidoComissaoService: PedidoComissaoService,
    public searchProdutosService: SearchProdutosService,
    public clienteEnderecoService: ClienteEnderecoService,
    public clienteRepresentanteService: ClienteRepresentanteService,
    public condicaoPagamentoService: CondicaoPagamentoService,
    public produtoService: ProdutoService,
    public tabelaPrecoService: TabelaPrecoService,
    public popupMessage: ToastrService,
    public pedidoItemService: PedidoItemService,

  ) {

  }


  get loading() {
    return this.loadingService.isLoading();
  }

  ngOnInit() {

    // this.isNew sofre alteração ao incluir um item. foi definido uma nova variavel para saber se é novo ou não
    this.isNewForOpemPedido = this.isNew

    if (!this.isNew) {
      this.tabelaPreco = this.formGroup.get('TabelaPrecoId').value; // carrega a tabela de preço

    } else {
      // define o default dos dropDowns
      // guid de tabela de preço default definida no genexus
      this.tabelaPrecoService.getById('60a81487-eba5-41b0-85ec-fd8b7900a806').subscribe(res => {

        if (res.TabelaPrecoId && res) {
          this.tabelaPreco = res.TabelaPrecoId
          this.formGroup.get('TabelaPrecoId').setValue(res.TabelaPrecoId);
        } else {
          this.tabelaPrecoService.getAll().subscribe(res => this.formGroup.get('TabelaPrecoId')
            .setValue(res.data ? res.data[0].TabelaPrecoId : '')); // seta vazio se não achar tabela de preço
        }
      });
      // guid de Cliente   default
      this.clienteService.getById('0FC39831-2D24-4E20-83E4-30D861B674A3').subscribe(res => {

        if (res.ClienteId && res) {
          this.setEnderecoPedido(res.ClienteId);
          this.formGroup.get('ClienteId').setValue(res.ClienteId);
        } else {
          this.clienteService.getAll().subscribe(res => this.formGroup.get('ClienteId')
            .setValue(res.data ? res.data[0].ClienteId : '')); // seta vazio se não achar Cliente
        }
      });

      this.pedidoService.getNewCodigoPedido().subscribe(res => { // busca um novo codigo para o pedido

        this.formGroup.get('PedidoCodigo').setValue(res.Codigo);
      });

    }

    this.pedidoService.updateTotal({ countItens: 0, total: this.formGroup.value.PedidoTotalValor });
    this.pedidoService.data.subscribe(res => {
      this.totalPedido = res.total;
      const desconto = this.formGroup.get('PedidoDesconto').value / 100 * this.totalPedido;
      this.formGroup.get('PedidoDescontoValor').setValue(desconto);
    });

    // adicionado formcontrol para cadastro de PedidoComissao
    this.formGroup.addControl('PedidoComissaoId', new FormControl('00000000-0000-0000-0000-000000000000'));
    this.formGroup.addControl('PedidoComissaoMedia', new FormControl(0, [Validators.pattern(/^[\d,.?!]+$/)]));
    this.formGroup.addControl('PedidoComissaoTipoRepresentante', new FormControl(1));

    if (this.formGroup.value.PedidoId !== '00000000-0000-0000-0000-000000000000') {
      this.pedidoId = this.formGroup.value.PedidoId;
      this.valueClienteChange(this.formGroup.value.ClienteId, 'cliente');
      this.valueClienteChange(this.formGroup.value.PedidoTransportadora, 'transportadora');
      // para pegar o representante do pedido, sendo que o mesmo se encontra em outra tabela
      this.pedidoComissaoService.getAll(null, this.formGroup.value.PedidoId).subscribe(res => {

        if (res.data) {
          this.formGroup.get('PedidoComissaoId').setValue(res.data[0].PedidoComissaoId);
          this.formGroup.get('PedidoComissaoTipoRepresentante').setValue(res.data[0].PedidoComissaoTipoRepresentante);
          this.formGroup.get('PedidoComissaoMedia').setValue(res.data[0].PedidoComissaoMedia);
          this.clienteService.getById(res.data[0].PedidoRepresentanteId).subscribe(res => {
            this.representante = res;
          });
        }
      });
    }
    this.formGroup.addControl('TipoPedido', new FormControl('revenda', [Validators.required])); // seta valor inicial do tipo do pedido
    this.tipoPedido = 'revenda';

    this.tipoCobrancaService.getAll().subscribe(res => this.tipobrancaList = res.data ? res.data : []);
    this.condicaoPagamentoService.getAll().subscribe(res => this.condicaoPagamentoList = res.data ? res.data : []);
    this.tabelaPrecoService.getAll().subscribe(res => this.tabelaPrecos = res.data ? res.data : []);

    this.clienteService.getAll().subscribe(res => {
      this.clienteList = res.data ? res.data.filter((item: Cliente) => item.ClienteTipoPessoa === true) : [];
      this.clienteData = res.data ? res.data : [];
      this.trasportadoraList = res.data ? res.data.filter((item: Cliente) => item.ClienteTipoTransportadora === true) : [];
      this.trasportadoraData = this.trasportadoraList;
      this.representanteList = res.data ? res.data.filter((item: Cliente) => item.ClienteTipoRepresentante === true) : [];
      this.representanteData = this.trasportadoraList;
    });

  }

  openSearchProduto() {
    this.searchProdutosService.opemSearchModal(true);
  }

  close() {
    this.openedFinalPedido = false;
  }

  opem() {
    if (this.formGroup.value.PedidoId !== '00000000-0000-0000-0000-000000000000') {
      this.openedFinalPedido = true;
    } else {
      this.containItens = false;
      this.popupMessage.warning("Nenhum Item foi adicionado ao pedido.")
    }
  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
    this.pedidoService.updateCart({ data: [], total: 0 });
    this.pedidoService.updateTotal({ countItens: 0, total: 0 });

  }




  salvarDados(parametro) {

    this.pedidoService.verificaSenhaVenda(this.PedidoSenhaVendedor.value).subscribe(res => {
      if (res.isValid) {
        if (parametro === 1) {
          this.PedidoSenhaVendedor.setValue('000000');
        }
        this.openedFinalPedido = true;
        const pedido: Pedido = Pedido.fromJson(this.formGroup.value);
        pedido.PedidoSenhaVendedor = this.PedidoSenhaVendedor.value;
        pedido.PedidoPendente = false;
        console.log('Pedido : ', pedido);
        this.pedidoService.setPedido(pedido).subscribe(res => {
          res.messages.forEach(item => {
            this.popupMessage.success(item.Description, item.Id);
          });
          this.pedidoId = res.Pedido.PedidoId;
          this.created = true;
          this.formGroup.get('PedidoId').setValue(res.Pedido.PedidoId);
        });
        this.close();
      } else {
        this.popupMessage.error("Senha de venda digitada Inválida")
      }
    });

  }

  produtosSelecionados({ ProdutoId, Quantidade, DescontoPercent, ComissaoPercent }) { // produtos que vieram da lista de produtos
    // busca dados do produto para montagem do pedidoItem
    const qtd = Quantidade
    this.produtoService.getById(ProdutoId).subscribe(res => {
      const produto = res;
      this.formGroupPedidoItem.patchValue({
        ComissaoItem: 1,
        PedidoId: this.isNew ? "00000000-0000-0000-0000-000000000000" : this.formGroup.get('PedidoId').value,
        PedidoItemComissaoId: "00000000-0000-0000-0000-000000000000",
        PedidoItemEmbalagemId: produto.ProdutoEmbalagemId,
        PedidoItemFrete: "",
        PedidoItemId: "00000000-0000-0000-0000-000000000000",
        PedidoItemIndice: "",
        PedidoItemItem: 0,
        PedidoItemPRODUTOId: ProdutoId, // id do produto
        PedidoItemPercentualDesconto: DescontoPercent,
        PedidoItemPrecoEspecial: 0,
        PedidoItemProdutoDescricao: produto.ProdutoDescricao,
        PedidoItemProdutoDescricao2: produto.ProdutoDescricaoComplementar,
        PedidoItemReferenciaId: produto.ProdutoReferenciaId,
        PedidoItemTipo: this.tipoPedido === 'revenda' ? 2 : 1,
        ProdutoCodigo: produto.ProdutoCodigo,
        ProdutoPrecoUnitario: 0,
        Quantidade: qtd, // quan
        TamanhoId: "00000000-0000-0000-0000-000000000000",
      });
      this.pedidoItem = PedidoItem.fromJson(this.formGroupPedidoItem.value);
      // tabela de preço utilizada no pedido
      this.pedidoItem.PedidoTabelaPreco = this.tabelaPreco;
      console.log('tabela de preco ', this.pedidoItem.PedidoTabelaPreco);
      this.pedidoItemService.addNewItemPedido(this.pedidoItem);
    });

  }

  onTipoChange(e) {
    this.tipoPedido = e;
  }

  changeTabelaPreco(e) {
    this.tabelaPreco = e;
    if (!this.isNew) {
      this.pedidoService.updatePriceItensPedido(this.pedidoId, e).subscribe(res => {
        this.popupMessage.info(res.messageItem);
        this.pedidoItemService.read(null, this.formGroup.value.PedidoId);
      });
    }

  }
  // EventEmitter de Pedido Item
  sendforPedido({ isNew, formPedido }) {
    this.isNew = isNew;
    if (isNew === false) {
      this.containItens = true;
    }
    this.pedidoId = formPedido.value.PedidoId;
    this.formGroup = formPedido;
  }


  updatePedido({ isNew, PedidoId }) {
    this.pedidoService.getById(PedidoId).subscribe(res => {
      this.pedidoId = res.PedidoId;
      this.formGroup.get('PedidoCodigo').setValue(res.PedidoCodigo);
      this.formGroup.get('PedidoId').setValue(res.PedidoId);
      this.formGroup.get('PedidoCodigo').setValue(res.PedidoCodigo);
      this.isNew = isNew;
    });
  }

  handleFilterCliente(e) {
    this.clienteList = this.clienteData.filter((item) =>
      item.ClienteNome.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  handleFilterTransportadora(e) {
    this.trasportadoraList = this.trasportadoraData.filter((item) =>
      item.ClienteNome.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  handleFilterRepresentante(e) {
    this.representanteList = this.representanteData.filter((item) =>
      item.ClienteNome.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  valueClienteChange(e, tipo) {
    if (e !== '') {
      switch (tipo) {
        case 'cliente':
          this.setEnderecoPedido(e);
          break;
        case 'transportadora':
          this.clienteService.getById(e).subscribe(res => { this.trasportadora = res; });
          break;
        case 'representante':
          this.clienteService.getById(e).subscribe(res => {
            this.representante = res;
            this.clienteRepresentanteService.getAll(null, e).pipe(map(res => { // filtra a comissao default a partir do representante
              return res.data ? res.data[0] : undefined; // retorna a comissao do Vendedodr
            })).subscribe(res => {
              this.formGroup.get('PedidoComissaoMedia').setValue(res.ClienteRepresentanteComissao);
            });
          });
          break;
        default:
          break;
      }
    }
  }

  focusOutDesconto(e) {
    const desconto = this.formGroup.get('PedidoDesconto').value / 100 * this.totalPedido;
    this.formGroup.get('PedidoDescontoValor').setValue(desconto);
  }


  setEnderecoPedido(e) {
    this.clienteService.getClienteFull(e).subscribe(res => {
      this.cliente = res.Cliente;
      // retorna o client
      this.clienteService.getById(res.ClienteRepresentantes[0].RepresentanteId).subscribe(res =>
        this.representante = res
      );
      this.formGroup.get('PedidoRepresentanteId').setValue(res.ClienteRepresentantes[0].RepresentanteId);
      this.formGroup.get('PedidoComissaoTipoRepresentante').setValue(res.ClienteRepresentantes[0].ClienteRepresentanteTipo);
      this.formGroup.get('PedidoComissaoMedia').setValue(res.ClienteRepresentantes[0].ClienteRepresentanteComissao);
      this.formGroup.get('CondicaoPagamentoId').setValue(res.Cliente.ClienteCondicaoPagamentoId);
      this.formGroup.get('TipoCobrancaId').setValue(res.Cliente.ClienteTipoCobrancaId);
      this.formGroup.get('PedidoTransportadora').setValue(res.Cliente.ClienteTransportadoraId);
      this.formGroup.get('PedidoTipoFrete').setValue(this.isNew ? 'cif' : res.Cliente.ClienteTipoFrete);

      if (res.Cliente.ClienteTransportadoraId !== '') {
        this.clienteService.getById(res.Cliente.ClienteTransportadoraId).subscribe(res =>
          this.trasportadora = res
        );
      }

      this.formGroup.get('PedidoCPFCNPJ').setValue(this.cliente.ClienteTipoCliente === 'J'
        ? this.cliente.ClienteCNPJ : this.cliente.ClienteCPF);
      this.clienteEndereco = res.ClienteEnderecos.find((item: ClienteEndereco) => item.ClienteEnderecoTipo === 'END');
      if (this.clienteEndereco) {
        this.formGroup.get('PedidoNomeEntrega').setValue(this.cliente.ClienteNome);
        this.formGroup.get('PedidoEnderecoEntrega').setValue(this.clienteEndereco.ClienteEndereco);
        this.formGroup.get('PedidoBairroEntrega').setValue(this.clienteEndereco.ClienteEnderecoBairro);
        this.formGroup.get('PedidoCidadeEntrega').setValue(this.clienteEndereco.ClienteEnderecoCidade);
        this.formGroup.get('PedidoCepEntrega').setValue(this.clienteEndereco.ClienteEnderecoCep);
        this.formGroup.get('PedidoUFEntrega').setValue(this.clienteEndereco.ClienteEnderecoUF);
      }
      const clienteEnderecoCobranca = res.ClienteEnderecos.find((item: ClienteEndereco) => item.ClienteEnderecoTipo === 'ENDC');
      if (clienteEnderecoCobranca) {// endereço de cobrança
        this.formGroup.get('PedidoNomeCobranca').setValue(this.cliente.ClienteNome);
        this.formGroup.get('PedidoEnderecoCobranca').setValue(clienteEnderecoCobranca.ClienteEndereco);
        this.formGroup.get('PedidoBairroCobranca').setValue(clienteEnderecoCobranca.ClienteEnderecoBairro);
        this.formGroup.get('PedidoCidadeCobranca').setValue(clienteEnderecoCobranca.ClienteEnderecoCidade);
        this.formGroup.get('PedidoCepCobranca').setValue(clienteEnderecoCobranca.ClienteEnderecoCep);
        this.formGroup.get('PedidoUFCobranca').setValue(clienteEnderecoCobranca.ClienteEnderecoUF);
      }
    });
    this.pedidoService.updateFormGroup(this.formGroup);
  }


}
const createFormGroup = (dataItem?: Pedido) => {
  if (dataItem) {
    return new FormGroup({
      CanalVendasId: new FormControl(dataItem.CanalVendasId),
      ClienteId: new FormControl(dataItem.ClienteId, [Validators.required]),
      CondicaoPagamentoId: new FormControl(dataItem.CondicaoPagamentoId, [Validators.required]),
      MktPlaceId: new FormControl(dataItem.MktPlaceId),
      PedidoAgendamento: new FormControl(dataItem.PedidoAgendamento),
      PedidoAvaliacao: new FormControl(dataItem.PedidoAvaliacao),
      PedidoBairroCobranca: new FormControl(dataItem.PedidoBairroCobranca),
      PedidoBairroEntrega: new FormControl(dataItem.PedidoBairroEntrega),
      PedidoCPFCNPJ: new FormControl(dataItem.PedidoCPFCNPJ),
      PedidoCaixa: new FormControl(dataItem.PedidoCaixa),
      PedidoRepresentanteId: new FormControl(dataItem.PedidoClienteRepresentante, [Validators.required]), // id do representante
      PedidoCaixaCancelamento: new FormControl(dataItem.PedidoCaixaCancelamento),
      PedidoCanalVendasAumento: new FormControl(dataItem.PedidoCanalVendasAumento),
      PedidoCanalVendasDesconto: new FormControl(dataItem.PedidoCanalVendasDesconto),
      PedidoCepCobranca: new FormControl(dataItem.PedidoCepCobranca),
      PedidoCepEntrega: new FormControl(dataItem.PedidoCepEntrega),
      PedidoChaveAcesso: new FormControl(dataItem.PedidoChaveAcesso),
      PedidoCidadeCobranca: new FormControl(dataItem.PedidoCidadeCobranca),
      PedidoCidadeEntrega: new FormControl(dataItem.PedidoCidadeEntrega),
      PedidoCodigo: new FormControl(dataItem.PedidoCodigo, [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      PedidoCubagemFrete: new FormControl(dataItem.PedidoCubagemFrete),
      PedidoDesconto: new FormControl(dataItem.PedidoDesconto, [Validators.pattern(/^[\d,.?!]+$/)]),
      PedidoDescontoValor: new FormControl(dataItem.PedidoDescontoValor),
      PedidoEmissao: new FormControl(new Date(dataItem.PedidoEmissao), [Validators.required]),
      PedidoEmpcod: new FormControl(dataItem.PedidoEmpcod),
      PedidoEmpresaId: new FormControl(dataItem.PedidoEmpresaId),
      PedidoEnderecoCobranca: new FormControl(dataItem.PedidoEnderecoCobranca),
      PedidoEnderecoEntrega: new FormControl(dataItem.PedidoEnderecoEntrega),
      PedidoId: new FormControl(dataItem.PedidoId),
      PedidoIdMktPlace: new FormControl(dataItem.PedidoIdMktPlace),
      PedidoLiberacaoData: new FormControl(dataItem.PedidoLiberacaoData),
      PedidoLiberacaoFaturamentoData: new FormControl(dataItem.PedidoLiberacaoFaturamentoData),
      PedidoLiberacaoFaturamentoHora: new FormControl(dataItem.PedidoLiberacaoFaturamentoHora),
      PedidoLiberacaoFaturamentoStatus: new FormControl(dataItem.PedidoLiberacaoFaturamentoStatus),
      PedidoLiberacaoFaturamentoUsuario: new FormControl(dataItem.PedidoLiberacaoFaturamentoUsuario),
      PedidoLiberacaoHora: new FormControl(dataItem.PedidoLiberacaoHora),
      PedidoLiberacaoObs: new FormControl(dataItem.PedidoLiberacaoObs),
      PedidoLiberacaoUsuario: new FormControl(dataItem.PedidoLiberacaoUsuario),
      PedidoNomeCobranca: new FormControl(dataItem.PedidoNomeCobranca),
      PedidoTipoPedido: new FormControl(dataItem.PedidoTipoPedido),
      PedidoNomeEntrega: new FormControl(dataItem.PedidoNomeEntrega),
      PedidoNotaFiscalId: new FormControl(dataItem.PedidoNotaFiscalId),
      PedidoNroOrcamento: new FormControl(dataItem.PedidoNroOrcamento),
      PedidoObsComercial: new FormControl(dataItem.PedidoObsComercial),
      PedidoObsInterna: new FormControl(dataItem.PedidoObsInterna),
      PedidoObsPrazoEntrega: new FormControl(dataItem.PedidoObsPrazoEntrega),
      PedidoOrcamento: new FormControl(dataItem.PedidoOrcamento),
      PedidoPedidoCliente: new FormControl(dataItem.PedidoPedidoCliente),
      PedidoPesoFrete: new FormControl(dataItem.PedidoPesoFrete),
      PedidoTipoEntrega: new FormControl(dataItem.PedidoTipoEntrega),
      PedidoTipoFrete: new FormControl(dataItem.PedidoTipoFrete),
      PedidoTransportadora: new FormControl(dataItem.PedidoTransportadora, [Validators.required]),
      PedidoUFCobranca: new FormControl(dataItem.PedidoUFCobranca),
      PedidoUFEntrega: new FormControl(dataItem.PedidoUFEntrega),
      PedidoValorFrete: new FormControl(dataItem.PedidoValorFrete),
      PedidoliberacaoFaturamentoObs: new FormControl(dataItem.PedidoliberacaoFaturamentoObs),
      TabelaPrecoId: new FormControl(dataItem.TabelaPrecoId, [Validators.required]),
      TipoCobrancaId: new FormControl(dataItem.TipoCobrancaId, [Validators.required]),
    }
    );
  } else {
    return new FormGroup({
      CanalVendasId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteId: new FormControl('', [Validators.required]),
      CondicaoPagamentoId: new FormControl('', [Validators.required]),
      MktPlaceId: new FormControl('MAGAZINELUIZA'),
      PedidoAgendamento: new FormControl('0000-00-00'),
      PedidoAvaliacao: new FormControl(0),
      PedidoBairroCobranca: new FormControl(''),
      PedidoBairroEntrega: new FormControl(''),
      PedidoCPFCNPJ: new FormControl(''),
      PedidoCaixa: new FormControl(''),
      PedidoCaixaCancelamento: new FormControl(''),
      PedidoCanalVendasAumento: new FormControl(0),
      PedidoCanalVendasDesconto: new FormControl(0),
      PedidoCepCobranca: new FormControl(''),
      PedidoCepEntrega: new FormControl(''),
      PedidoChaveAcesso: new FormControl(''),
      PedidoCidadeCobranca: new FormControl(''),
      PedidoRepresentanteId: new FormControl('', [Validators.required]),
      PedidoCidadeEntrega: new FormControl(''),
      PedidoCodigo: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]),
      PedidoCubagemFrete: new FormControl(''),
      PedidoDesconto: new FormControl('', [Validators.pattern(/^[\d,.?!]+$/)]),
      PedidoDescontoValor: new FormControl(''),
      PedidoEmissao: new FormControl(new Date(), [Validators.required]),
      PedidoEmpcod: new FormControl(0),
      PedidoEmpresaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoEnderecoCobranca: new FormControl(''),
      PedidoEnderecoEntrega: new FormControl(''),
      PedidoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoIdMktPlace: new FormControl(''),
      PedidoLiberacaoData: new FormControl('0000-00-00T00:00:00'),
      PedidoLiberacaoFaturamentoData: new FormControl('0000-00-00T00:00:00'),
      PedidoLiberacaoFaturamentoHora: new FormControl(''),
      PedidoLiberacaoFaturamentoStatus: new FormControl(0),
      PedidoTipoPedido: new FormControl(4),
      PedidoLiberacaoFaturamentoUsuario: new FormControl(''),
      PedidoLiberacaoHora: new FormControl(''),
      PedidoLiberacaoObs: new FormControl(''),
      PedidoLiberacaoUsuario: new FormControl(''),
      PedidoNomeCobranca: new FormControl(''),
      PedidoNomeEntrega: new FormControl(''),
      PedidoNotaFiscalId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoNroOrcamento: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoObsComercial: new FormControl(''),
      PedidoObsInterna: new FormControl(''),
      PedidoObsPrazoEntrega: new FormControl(''),
      PedidoOrcamento: new FormControl(0),
      PedidoPedidoCliente: new FormControl(''),
      PedidoPesoFrete: new FormControl(''),
      PedidoTipoEntrega: new FormControl('rna'),
      PedidoTipoFrete: new FormControl('cif'),
      PedidoTransportadora: new FormControl(''),
      PedidoUFCobranca: new FormControl(''),
      PedidoUFEntrega: new FormControl(''),
      PedidoValorFrete: new FormControl(''),
      PedidoliberacaoFaturamentoObs: new FormControl(''),
      TabelaPrecoId: new FormControl('', [Validators.required]), // guid '00000000-0000-0000-0000-000000000000'
      TipoCobrancaId: new FormControl('', [Validators.required]),
    });
  }
};

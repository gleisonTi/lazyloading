import { PedidoItem } from './../shared/pedido-item.model';
import { Component, OnInit, Injector, Input, Injectable, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PedidoItemService } from '../shared/pedido-item.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { ReferenciaService } from '../../referencia/shared/referencia.service';
import { Referencia } from '../../referencia/shared/referencia.model';
import { ReferenciaVariacaoService } from '../../referencia-variacao/shared/referencia-variacao.service';
import { VariacaoService } from '../../variacao/shared/variacao.service';
import { ReferenciaVariacao } from '../../referencia-variacao/shared/referencia-variacao.model';
import { Variacao } from '../../variacao/shared/variacao.model';
import { ProdutoService } from '../../produto/shared/produto.service';
import { Produto } from '../../produto/shared/produto.model';
import { TabelaPrecoProdutoService } from '../../tabela-preco-produto/shared/tabela-preco-produto.service';
import { TabelaPrecoProduto } from '../../tabela-preco-produto/shared/tabela-preco-produto.model';
import { EmbalagemService } from 'src/app/pages/basico/embalagem/shared/embalagem.service';
import { Embalagem } from 'src/app/pages/basico/embalagem/shared/embalagem.model';
import { PedidoService } from '../../pedido/shared/pedido.service';
import { PedidoItemTamanhoService } from '../../pedido-item-tamanho/shared/pedido-item-tamanho.service';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { PedidoComissaoService } from '../../pedido-comissao/shared/pedido-comissao.service';
import { PedidoItemComissaoService } from '../../pedido-item-comissao/shared/pedido-item-comissao.service';
import { State } from '@progress/kendo-data-query';
import { ToastrService } from 'ngx-toastr';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { map, take, tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { PedidoItemTamanho } from '../../pedido-item-tamanho/shared/pedido-item-tamanho.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Component({
  selector: 'incca-pedido-item-grid',
  templateUrl: './pedido-item-grid.component.html',
  styleUrls: ['./pedido-item-grid.component.scss'],
  providers: [VariacaoService, ProdutoService]
})
@Injectable()
export class PedidoItemGridComponent extends BaseResourceGridComponent<PedidoItem> implements OnInit {


  @Input() pedidoId: string;
  @Input() isNewPedido: boolean;
  @Input() pedidoItem: PedidoItem;
  @Input() tipoPedido: string; // produção ou pronta entrega
  @Input() tabelaPrecoId: string;
  @Output() sendforPedido = new EventEmitter<{ isNew: boolean, formPedido: FormGroup }>();
  @Output() updatePedido = new EventEmitter<{ isNew: boolean, PedidoId: string }>();
  public semImagem = 'assets/img/utils/sem_imagem.jpg';
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/')

  // emitir criação do pedido no pedido item para não tentar criar outro pedido com  o mesmo cadastro
  public openedCadProduto = false;
  public refeferenciaList: Referencia[];
  public refeferenciaData: Referencia[];
  public formPedido: FormGroup;
  // se no filtro for encontrado uma lista de produtos eles são passados para o windows
  public produtoItensSearch: GridDataResult = { data: [], total: 0 };
  public dropVariacoesList: Variacao[] = [];
  public dropEmbalagemList: Embalagem[] = [];
  public pedidoItensList: PedidoItem[] = [];
  public itemNumber: number;
  public totalPedido: number;
  public quantidade: number;

  public findProduto: boolean;
  public ProdutosIdList: Array<string>;
  public activeSearch = false;
  public produto: Produto;
  public precoproduto: TabelaPrecoProduto;
  public valorUnitarioInicial: number;
  public updateComissaoPedido: boolean; // define se a comissao geral do pedido deverá ser atualizada.
  private subscription: Subscription = new Subscription(); // utilizado para unsubscribe no metodo OnDestroy


  constructor(
    protected injector: Injector,
    protected pedidoItemService: PedidoItemService,
    public referenciaService: ReferenciaService,
    public popupMessage: ToastrService,
    private hotkeysService: HotkeysService,
    public pedidoService: PedidoService,
    public referenciaVariacaoService: ReferenciaVariacaoService,
    public produtoService: ProdutoService,
    public variacaoService: VariacaoService,
    public tabelaPrecoProduto: TabelaPrecoProdutoService,
    public pedidoComissaoService: PedidoComissaoService,
    public pedidoItemComissaoService: PedidoItemComissaoService,
    public embalagemService: EmbalagemService,
    public pedidoItemTamanhoService: PedidoItemTamanhoService
  ) {
    super(injector, new PedidoItem(), pedidoItemService, createFormGroup);
    // adiciona techa de atalho
    this.hotkeysService.add(new Hotkey('f3', (event: KeyboardEvent): boolean => {
      this.openedCadProduto = true;
      return false; // Prevent bubbling
    }));

    // dispara o saveitem ao atualizar o objerver
    this.subscription.add(
      this.pedidoItemService.newItem.subscribe(res => {
        if (res) {
          this.saveItem(res);
        }
      }));
  }

  get loading() {
    return this.loadingService.isLoading();
  }

  public ngOnInit(): void {

    // dados do pedido
    this.pedidoService.formSubject.subscribe(res => { this.formPedido = res; });
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'PedidoItem').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.pedidoId);
    this.view = this.resourceService;
    this.embalagemService.getAll().subscribe(res => {
      this.dropEmbalagemList = res.data ? res.data : [];
    });
    this.pedidoService.data.subscribe(res => {
      this.totalPedido = res.total;
    });


  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.resourceService.read(this.gridState, this.pedidoId);
  }

  public getImageUrl(dataItem) {
    if (dataItem.PedidoItemProdutoImagem !== '') {
      return this.baseUrl + dataItem.PedidoItemProdutoImagem;
    } else {
      return this.semImagem
    }
  }

  // public savePedido(formGroup, isNew) {

  //   if (this.formGroup.value.PedidoItemPreco !== '') { // se eo preço do item for diferente de vazio
  //     if (this.isNewPedido) {
  //       const pedido: Pedido = Pedido.fromJson(this.formPedido.value);
  //       this.pedidoService.save(pedido, this.isNewPedido).subscribe(res => {
  //         this.pedidoId = res.PedidoId; // update de id do pedido
  //         this.formPedido.get('PedidoId').setValue(res.PedidoId);
  //         this.saveItem(formGroup, this.isNewPedido);
  //         this.savePedidoComissao(this.formPedido, this.isNewPedido); // salva a comissão do pedido
  //         this.isNewPedido = false; // para proximo item ser incluido no pedido sem que seja criado um novo
  //         // this.sendforPedido.emit({isNew: false, pedidoId: this.pedidoId}); // ao adicionar um item o pedido deixa  de ser novo
  //         this.popupMessage.success('Pedido criado com sucesso');
  //       });
  //     } else {
  //       this.saveItem(formGroup, isNew);
  //     }
  //   } else {
  //     this.popupMessage.warning('Item sem valor em sua tabela de preço. não foi possivel adicionar');
  //   }

  //   // ao salvar atualizar PedidoId para Salvar novos itens
  // }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) { // save do item ja cadastrado no grid
    if (formGroup.get('Quantidade').value > 0) {
      this.saveItemUpd(formGroup, isNew);
    } else {
      this.popupMessage.error("Quantidade Inválida");
    }


    sender.closeRow(rowIndex);
  }

  public saveItem(PedidoItem: PedidoItem) {
    this.pedidoItemService.setPedidoItem(PedidoItem, this.isNewPedido).subscribe(res => {
      console.log(res);
      res.messages.forEach(item => {
        if (item.Id === 'Success') {
          this.popupMessage.success(item.Description, item.Id)
        } else {
          this.popupMessage.error(item.Description, item.Id)
        }
      });
      // se o pedido for novo atualiza o corpo do pedido.
      if (this.isNewPedido) {
        this.updatePedido.emit({ isNew: false, PedidoId: res.PedidoItem.PedidoId })
      }
    });

  }


  public saveItemUpd(formGroup, isNew) {

    this.formGroup.get('PedidoItemOrdem').setValue(this.itemNumber);
    this.formGroup.get('PedidoItemTipo').setValue(this.formPedido.value.TipoPedido === 'revenda' ? 2 : 1);
    this.formGroup.get('PedidoItemItem').setValue(this.itemNumber);
    this.resource = PedidoItem.fromJson(formGroup.value);
    this.quantidade = this.formGroup.value.Quantidade;
    if (this.validateForm()) {
      // se o formulario for valido salva o item a quantidade e a comissão
      this.pedidoItemService.save(this.resource, isNew).subscribe((res) => {
        // console.log(res);
        this.updatequantidade(this.resource, isNew);
        this.formGroup = formGroup;
        this.popupMessage.success(isNew ? 'Item adicionado com sucesso' : 'Item atualizado com sucesso');
      });

      this.formGroup = createFormGroup();
      this.findProduto = false;
    }
  }
  // // salva a comissão do Pedido na Tabela PedidoCommissão
  // public savePedidoComissao(formPedido: FormGroup, isNew: boolean) {
  //   const pedidoComissao: PedidoComissao = PedidoComissao.fromJson(new PedidoComissao(
  //     formPedido.value.PedidoComissaoId, this.pedidoId, formPedido.value.PedidoRepresentanteId,
  //     formPedido.value.PedidoComissaoMedia, formPedido.value.PedidoComissaoTipoRepresentante));
  //   this.pedidoComissaoService.save(pedidoComissao, isNew).pipe(tap(res => {
  //     this.formPedido.get('PedidoComissaoId').setValue(res.PedidoComissaoId);
  //     this.resourceService.read(this.gridState, this.resource.PedidoId);
  //     this.sendforPedido.emit({ isNew: false, formPedido: this.formPedido }); // atualiza os dados do pedido para update
  //   }
  //   ))
  //     .subscribe();

  // }

  // salva a comissão do item na tabela Pedido item Comissão
  // public savePedidoItemComissao(pedidoitem: PedidoItem, isNew: boolean) {
  //   const pedidoitemComissao: PedidoItemComissao = PedidoItemComissao.fromJson(new PedidoItemComissao(
  //     isNew ? '00000000-0000-0000-0000-000000000000' : this.formGroup.value.PedidoItemComissaoId, // se não for novo atualiza o item
  //     pedidoitem.PedidoItemId, this.formPedido.value.PedidoRepresentanteId,
  //     isNew ? this.formPedido.value.PedidoComissaoMedia : this.formGroup.value.ComissaoItem,
  //     this.formPedido.value.PedidoComissaoTipoRepresentante));
  //   this.pedidoItemComissaoService.save(pedidoitemComissao, isNew).pipe(tap(res =>
  //     this.resourceService.read(this.gridState, this.resource.PedidoId)))
  //     .subscribe(() => {
  //       this.updateComissao();
  //     });
  // }


  updateComissao() {
    this.pedidoItemService.updateComissaoPedido(this.formPedido.value.PedidoId).subscribe(res => {
      this.formPedido.get('PedidoComissaoMedia').setValue(res.comissaoMedia);
      this.sendforPedido.emit({ isNew: false, formPedido: this.formPedido }); // atualiza os dados do pedido para update
      this.popupMessage.info(res.message);
    });
  }


  //salva quantidade do item na tabela PedidoTamanho
  public updatequantidade(pedidoitem: PedidoItem, isNew: boolean) {
    console.log(pedidoitem);
    const pedidoItemTamanho: PedidoItemTamanho = PedidoItemTamanho.fromJson(new PedidoItemTamanho(
      isNew ? '00000000-0000-0000-0000-000000000000' : pedidoitem.PedidoItemTamanhoId, pedidoitem.PedidoItemId,
      pedidoitem.PedidoItemTamanho,//--> TamanhoId
      this.quantidade.toString()
    ));
    this.pedidoItemTamanhoService.save(pedidoItemTamanho, isNew).pipe(tap(res =>
      this.resourceService.read(this.gridState, this.resource.PedidoId)
    )).subscribe();
  }

  // remove item do pedido
  public removeHandler({ dataItem }) {
    this.resource = PedidoItem.fromJson(dataItem);
    this.pedidoItemService.removeItemPedido(this.resource.PedidoItemId).subscribe(res => {
      //  this.updateComissao();

      this.popupMessage.success(res.Message.Description, res.Message.Id);
      this.resourceService.read(this.gridState, this.resource.PedidoId); // para atualizar o grid quando remover
    });

  }

  public close() {
    this.openedCadProduto = false;
  }
  public opem() {
    this.openedCadProduto = true;
  }


  focusOutComissao(e) {
    if (e !== this.formPedido.value.PedidoComissaoMedia) {
      this.updateComissaoPedido = true;
    } else {
      this.updateComissaoPedido = false;
    }

  }

  changeDescontoItem(dataItem, descontoPercent) {
    const desconto = descontoPercent / 100 *
      (dataItem.PedidoProdutoPreco * this.formGroup.get('Quantidade').value); // total do itemdataItem
    this.formGroup.get('PedidoItemValorDesconto').setValue(desconto);

    this.formGroup.get('PedidoItemPreco').setValue(
      (dataItem.PedidoProdutoPreco * this.formGroup.get('Quantidade').value)
      - desconto);
  }

  changeQuantidade(dataItem, quantidade) {
    const precoUnitario = dataItem.PedidoProdutoPreco - (
      this.formGroup.get('PedidoItemPercentualDesconto').value /
      100 * dataItem.PedidoProdutoPreco); // valor do desconto
    const total = quantidade * precoUnitario;
    this.formGroup.get('PedidoItemPreco').setValue(total);
  }

  handleFilterReferncia(e) {
    this.refeferenciaList = this.refeferenciaData.filter((item) =>
      item.ReferenciaDescricaoCompleta.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }
  changePrecoUnitario(valorUnitario) {
    let desconto = this.valorUnitarioInicial - this.formGroup.get('ProdutoPrecoUnitario').value;
    const total = this.valorUnitarioInicial - desconto;
    let porcentagemDesc = (desconto / this.valorUnitarioInicial) * 100;
    if (desconto < 0) {
      desconto = 0;
      porcentagemDesc = 0;
    }
    this.formGroup.get('PedidoItemValorDesconto').setValue(desconto);
    this.formGroup.get('PedidoItemPercentualDesconto').setValue(porcentagemDesc);
    this.formGroup.get('PedidoItemPreco').setValue(total * this.formGroup.get('Quantidade').value);
  }

  focusOutFunction(e) {
    this.activeSearch = true;
    if (e !== '') {
      this.gridState.filter.filters = [
        !isNaN(e) ? // se o que foi digitado for número busca por codigo se não busca por descrição
          { field: 'ProdutoCodigo', operator: 'contains', value: e } :
          { field: 'ProdutoDescricao', operator: 'contains', value: e }];

      this.produtoService.getAll(this.gridState).pipe(map(res => {
        if (res.data) {
          if (res.data.length <= 1) {
            this.produto = res.data[0];
            this.setProdutoSelected(this.produto); // seta os dados do produto em seus devidos campos
          } else {
            this.produtoItensSearch = res;
            this.opem();
          }
        } else {
          this.findProduto = false;
        }
      })).subscribe(res => {
      });
    }
  }


  // public getProdutosChild(e) { // pega os id's dos produtos selecionados na tela de pesquisa
  //   this.ProdutosIdList = e
  // }


  // percorreArrayProduto(e) { // pega os id's dos produtos selecionados na tela de pesquisa

  //   this.openedCadProduto = false
  //   if (this.ProdutosIdList) {
  //     this.carregaForm(this.ProdutosIdList[0]); // primeiro item
  //   } else {
  //     this.popupMessage.info("Nenhum produto foi selecionado.")
  //   }
  //   // percorrer o produtoidList adicionado os itens a cada interação escolhendo a embalagem.
  // }

  carregaForm(produtoId: string) {
    this.produtoService.getById(produtoId).subscribe(res => {
      this.setProdutoSelected(res);
    });
  }

  setProdutoSelected(produto: Produto) {
    this.produto = produto;
    this.formGroup.get('ProdutoCodigo').setValue(produto.ProdutoCodigo);
    this.formGroup.get('PedidoItemPRODUTOId').setValue(produto.ProdutoId);
    this.formGroup.get('PedidoItemReferenciaId').setValue(produto.ProdutoReferenciaId);
    this.formGroup.get('PedidoItemProdutoDescricao').setValue(produto.ProdutoDescricao);
    this.formGroup.get('PedidoItemProdutoDescricao2').setValue(produto.ProdutoDescricaoComplementar);

    this.tabelaPrecoProduto.produtoPossuiPreco(produto.ProdutoId, this.formPedido.value.TabelaPrecoId)
      .subscribe(res => {

        if (res.containsPrice) {
          this.valorUnitarioInicial = res.TabelaPrecoProduto.TabelaPrecoProdutoValor;
          this.formGroup.get('ProdutoPrecoUnitario').setValue(res.TabelaPrecoProduto.TabelaPrecoProdutoValor);
          this.formGroup.get('PedidoItemPreco').setValue(
            this.formGroup.get('Quantidade').value * this.formGroup.get('ProdutoPrecoUnitario').value);
        } else {
          this.popupMessage.warning('Tabela de preço selecionada não possui valores em seus produtos');
        }
      });
    this.findProduto = true;

  }

  valueReferenciaChange(e) {
    this.referenciaVariacaoService.getAll(null, e).subscribe(res => { // busca todas as variações a partir da refencias
      const refVariacao: ReferenciaVariacao[] = res.data ? res.data : [];
      refVariacao.forEach(item => { // percorre as variações
        this.variacaoService.getById(item.VariacaoId).subscribe(res => {
          this.dropVariacoesList.push(res);
        });
      });
    });
  }

  validateForm() {
    if (this.formGroup.invalid) {
      this.formGroup.get('PedidoItemEmbalagemId').markAsTouched();
      return false;
    }
    return true;
    // do something else
  }

  getProdutoSearch(produto: Produto) {
    this.close();
    this.setProdutoSelected(produto);
  }

  closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
  }
}

const createFormGroup = (dataItem?: PedidoItem) => {
  if (dataItem) {
    return new FormGroup({
      PedidoId: new FormControl(dataItem.PedidoId),
      PedidoItemId: new FormControl(dataItem.PedidoItemId),
      PedidoItemProdutoDescricao: new FormControl(dataItem.PedidoItemProdutoDescricao),
      PedidoItemProdutoDescricao2: new FormControl(dataItem.PedidoItemProdutoDescricao2),
      PedidoItemAliquotaIcms: new FormControl(dataItem.PedidoItemAliquotaIcms, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      PedidoItemAliquotaIcmsST: new FormControl(dataItem.PedidoItemAliquotaIcmsST, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      PedidoItemAvaliacao: new FormControl(dataItem.PedidoItemAvaliacao),
      PedidoItemBaixaEstoque: new FormControl(dataItem.PedidoItemBaixaEstoque),
      PedidoItemBaseIcms: new FormControl(dataItem.PedidoItemBaseIcms),
      PedidoItemBaseIcmsST: new FormControl(dataItem.PedidoItemBaseIcmsST),
      PedidoItemCancelamentoData: new FormControl(dataItem.PedidoItemCancelamentoData),
      PedidoItemCancelamentoUsuario: new FormControl(dataItem.PedidoItemCancelamentoUsuario),
      PedidoItemDataEntrega: new FormControl(dataItem.PedidoItemDataEntrega),
      PedidoItemEmbalagemId: new FormControl(dataItem.PedidoItemEmbalagemId, Validators.required),
      PedidoItemFrete: new FormControl(dataItem.PedidoItemFrete),
      PedidoItemIndice: new FormControl(dataItem.PedidoItemIndice),
      PedidoItemInicioProducao: new FormControl(dataItem.PedidoItemInicioProducao),
      PedidoItemItem: new FormControl(dataItem.PedidoItemItem),
      PedidoItemMaximoFicha: new FormControl(dataItem.PedidoItemMaximoFicha),
      PedidoItemObs: new FormControl(dataItem.PedidoItemObs),
      PedidoItemObs1: new FormControl(dataItem.PedidoItemObs1),
      PedidoItemOrdem: new FormControl(dataItem.PedidoItemOrdem),
      PedidoItemPRODUTOId: new FormControl(dataItem.PedidoItemPRODUTOId),
      PedidoItemPercentualDesconto: new FormControl(dataItem.PedidoItemPercentualDesconto),
      PedidoItemPreco: new FormControl(dataItem.PedidoItemPreco),
      PedidoItemPrecoEspecial: new FormControl(dataItem.PedidoItemPrecoEspecial),
      PedidoItemReferenciaId: new FormControl(dataItem.PedidoItemReferenciaId),
      PedidoItemTamanho: new FormControl(dataItem.PedidoItemTamanho),
      PedidoItemTamanhoId: new FormControl(dataItem.PedidoItemTamanhoId),
      PedidoItemComissaoId: new FormControl(dataItem.PedidoItemComissaoId),
      PedidoItemSeparacaoData: new FormControl(dataItem.PedidoItemSeparacaoData),
      PedidoItemSeparacaoUsuario: new FormControl(dataItem.PedidoItemSeparacaoUsuario),
      PedidoItemSitSeparacao: new FormControl(dataItem.PedidoItemSitSeparacao),
      PedidoItemSituacao: new FormControl(dataItem.PedidoItemSituacao),
      PedidoItemTipo: new FormControl(dataItem.PedidoItemTipo),
      PedidoItemValorDesconto: new FormControl(dataItem.PedidoItemValorDesconto),
      PedidoItemValorIcms: new FormControl(dataItem.PedidoItemValorIcms),
      PedidoItemValorIcmsST: new FormControl(dataItem.PedidoItemValorIcmsST),
      // forms adicionais
      ProdutoCodigo: new FormControl(''),
      ComissaoItem: new FormControl(dataItem.PedidoItemComissao, [Validators.pattern(/^[0-9]+$/)]),
      Quantidade: new FormControl(dataItem.PedidoQuantidade, [Validators.pattern(/^[0-9]+$/)]),
      // TamanhoId será definido a partir da grade do produto. No caso de autopeça será uma Grade unitaria
      TamanhoId: new FormControl('00000000-0000-0000-0000-000000000000'), // por enquanto será guid zerada
      ProdutoPrecoUnitario: new FormControl('', [Validators.pattern(/^[\d,.?!]+$/)]),
    }
    );
  } else {
    return new FormGroup({
      PedidoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemProdutoDescricao: new FormControl(''),
      PedidoItemProdutoDescricao2: new FormControl(''),
      PedidoItemAliquotaIcms: new FormControl(0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      PedidoItemAliquotaIcmsST: new FormControl(0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      PedidoItemAvaliacao: new FormControl(0),
      PedidoItemBaixaEstoque: new FormControl(0),
      PedidoItemBaseIcms: new FormControl(''),
      PedidoItemBaseIcmsST: new FormControl(''),
      PedidoItemCancelamentoData: new FormControl(''),
      PedidoItemCancelamentoUsuario: new FormControl(''),
      PedidoItemDataEntrega: new FormControl(''),
      PedidoItemEmbalagemId: new FormControl('', Validators.required),
      PedidoItemFrete: new FormControl(''),
      PedidoItemIndice: new FormControl(''),
      PedidoItemInicioProducao: new FormControl(''),
      PedidoItemItem: new FormControl(0),
      PedidoItemMaximoFicha: new FormControl(''),
      PedidoItemObs: new FormControl(''),
      PedidoItemObs1: new FormControl(''),
      PedidoItemOrdem: new FormControl(''),
      PedidoItemPRODUTOId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemPercentualDesconto: new FormControl(0),
      PedidoItemPreco: new FormControl(''),
      PedidoItemPrecoEspecial: new FormControl(0),
      PedidoItemReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemTamanho: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemTamanhoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemComissaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      PedidoItemSeparacaoData: new FormControl(''),
      PedidoItemSeparacaoUsuario: new FormControl(''),
      PedidoItemSitSeparacao: new FormControl(0),
      PedidoItemSituacao: new FormControl(0),
      PedidoItemTipo: new FormControl(0),
      PedidoItemValorDesconto: new FormControl(0),
      PedidoItemValorIcms: new FormControl(''),
      PedidoItemValorIcmsST: new FormControl(''),
      // forms adicionais
      ProdutoCodigo: new FormControl(''),
      ComissaoItem: new FormControl(1, [Validators.pattern(/^[0-9]*$/)]),
      Quantidade: new FormControl(1, [Validators.pattern(/^[0-9]*$/)]),
      TamanhoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ProdutoPrecoUnitario: new FormControl('', [Validators.pattern(/^[\d,.?!]+$/)]),
    });
  }
};

export const pedidoItemForm = createFormGroup;


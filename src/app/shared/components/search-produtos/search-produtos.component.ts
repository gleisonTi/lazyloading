import { bloomAdd } from '@angular/core/src/render3/di';
import { ParametroService } from './../../../pages/basico/parametro/shared/parametro.service';
import { Subscription } from 'rxjs/Subscription';
import { Produto } from './../../../pages/basico/produto/shared/produto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AfterViewInit, Injector, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Component, OnInit, Input, OnChanges, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';
import { SearchProdutosService } from './shared/search-produtos.service';
import { BaseResourceGridComponent } from '../base-resource-grid/base-resource-grid.component';
import { createFormGroup } from 'src/app/pages/basico/produto/produto-grid/produto-grid.component';
import { GridComponent, RowArgs } from '@progress/kendo-angular-grid';
import { TabelaPrecoService } from 'src/app/pages/basico/tabela-preco/shared/tabela-preco.service';
import { ToastrService } from 'ngx-toastr';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'incca-search-produtos',
  templateUrl: './search-produtos.component.html',
  styleUrls: ['./search-produtos.component.scss']
})
export class SearchProdutosComponent extends BaseResourceGridComponent<Produto> implements OnInit {


  @ViewChildren('inputSearch') public inputEl: any;
  public grid: GridComponent;
  public showPesquisa = false;
  @Input() public tabelaPrecoId
  @Output() public sendprodutos = new EventEmitter<any>()
  @Input() public typePanel: string = 'Pedido'; // define qual tela a listagem de pedido esta sendo chamada
  public openedSearchProduto: boolean;
  public showGrid = false;
  public toggleRow = false;
  public subscription = new Subscription();
  public isQuantidadeNegativa: boolean;
  public textSearch: string;
  public rowLine: { ProdutoId: string, index: string, Comissao: string };
  public itemformGroup = new FormGroup({
    ProdutoId: new FormControl(''),
    Quantidade: new FormControl(1, [Validators.required]),
    DescontoPercent: new FormControl(0, [, Validators.pattern(/^[\d,.?!]+$/)]),
    ComissaoPercent: new FormControl(0, [Validators.required, Validators.pattern(/^[\d,.?!]+$/)])
  });

  constructor(
    protected injector: Injector,
    protected searchProdutosService: SearchProdutosService,
    protected parametroService: ParametroService,
    protected popuMessage: ToastrService,
    protected tabelaPrecoService: TabelaPrecoService,
    private hotkeysService: HotkeysService) {
    super(injector, new Produto(), searchProdutosService, createFormGroup);
    this.hotkeysService.add([
      new Hotkey('f4', (event: KeyboardEvent): boolean => {
        this.opem();
        return false;
      }),
      new Hotkey('f3', (event: KeyboardEvent): boolean => {
        this.close();
        return false;
      })]);

    this.parametroService.getById('5F763444-77F0-457B-BE5D-006AC7AC2849').subscribe(res => {
      this.isQuantidadeNegativa = res.ParametroValor === 'true';
    });

  }

  public mySelection: string[] = [];
  public mySelectionKey(context: RowArgs): string {
    // criação de um objeto literal para pegar o index da linha, comissao e o id do produto
    return `{
     "ProdutoId":"${context.dataItem.ProdutoId}",
     "Comissao":"${context.dataItem.ProdutoComissao}",
     "index":"${context.index}"}`;
  }

  ngOnInit() {

    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'produto').subscribe(res => {
      this.helpList = res;
    });
    //mudar para buscar de outra forma
    this.tabelaPrecoService.getById('60a81487-eba5-41b0-85ec-fd8b7900a806').subscribe(res => {
      if (res.TabelaPrecoId && res) {
        this.tabelaPrecoId = this.tabelaPrecoId === '' ? res.TabelaPrecoId : this.tabelaPrecoId// se id da tabela for vazio utiliza a padrão
        this.searchProdutosService.read(this.gridState, { text: '', TabelaPrecoId: this.tabelaPrecoId });
        this.view = this.searchProdutosService
      }
    });

    this.subscription.add(this.searchProdutosService.opemSearch.subscribe(res => {
      if (res) {
        this.opem();
      }
    }));
  }

  calcularValorItem(dataItem): number {
    const desconto = this.itemformGroup.controls['DescontoPercent'].value / 100 *
      (dataItem.ProdutoPreco * this.itemformGroup.controls['Quantidade'].value);
    const valorItem = (dataItem.ProdutoPreco * this.itemformGroup.controls['Quantidade'].value)
    return valorItem - desconto;
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.searchProdutosService.read(this.gridState, { text: '', TabelaPrecoId: this.tabelaPrecoId });
  }

  searchfunction(text: string) {
    this.searchProdutosService.read(this.gridState, { text: this.textSearch, TabelaPrecoId: this.tabelaPrecoId });
    this.showGrid = true;
  }

  getText(text: string) {
    this.textSearch = text;
    if (text === '') {
      this.searchProdutosService.read(this.gridState, { text: this.textSearch, TabelaPrecoId: this.tabelaPrecoId });
    }
  }

  search() {
    this.searchfunction('');
  }

  possuiValor(dataItem): boolean {
    if (parseFloat(dataItem.ProdutoPreco) < 1) {
      return false;
    } else {
      return true;
    }
  }

  possuiQuantidade(dataItem): boolean {

    if (parseFloat(dataItem.ProdutoEstoqueQuantidade) < 1 && !this.isQuantidadeNegativa) {
      return false;
    } else {
      return true;
    }
  }

  opem() {
    this.openedSearchProduto = true;
  }

  close() {
    this.openedSearchProduto = false;
    this.showGrid = false;
    this.itemformGroup.reset();
    this.itemformGroup.patchValue({ // seta valores iniciais do form
      Quantidade: 1,
      DescontoPercent: 0,
      ComissaoPercent: 0,
    });
    this.mySelection = [];
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe() // para garantir a saida do observer
  }

  onSelectedKeysChange(e) {
    this.itemformGroup.reset(); // resta formGroup da linha
    this.rowLine = JSON.parse(e[0].toString())
    this.itemformGroup.get('ProdutoId').setValue(this.rowLine.ProdutoId);
  }

  doubleClickHandler(grid: GridComponent, e) { // doubleClick para selecionar um item no grid
    this.grid = grid;
    this.collapseAllRows(); // fecha todas as linhas
    this.itemformGroup.patchValue({ // seta valores iniciais do form
      Quantidade: 1,
      DescontoPercent: 0,
      ComissaoPercent: this.rowLine.Comissao ? this.rowLine.Comissao : 0,
    });
    grid.expandRow(parseInt(this.rowLine.index));
  }

  collapseAllRows() {
    this.view.subscribe(res => {
      if (res.data) {
        res.data.forEach((item, idx) => {
          this.grid.collapseRow(idx);
        });
      }
    });
  }

  focusOutQuantidade(qtdMax, qtdInput) {
    if (qtdInput !== '') {
      if (parseFloat(qtdInput) > parseFloat(qtdMax)) {
        this.popuMessage.error('Quantidade digitada indisponível')
      }
    }
  }

  verificaQuantidade(qtdMax, qtdInput) {
    this.itemformGroup.get('Quantidade').setValidators([Validators.max(qtdMax)]);
    this.itemformGroup.get('Quantidade').updateValueAndValidity
  }

  setItensCart() {
    this.sendprodutos.emit(this.itemformGroup.value);

  }

  cadPrecoProduto() {
    this.router.navigateByUrl('/tabelapreco', {
      state: { tabelaId: "TabelaId " }
    });
    //  this.router.navigate([{ outlets: { pesquisa: 'tabelapreco' } }]);
  }

  produtoEstoque() {
    this.router.navigateByUrl('/produto', {
      state: { tabelaId: "TabelaId " }
    });
    //  this.router.navigate([{ outlets: { pesquisa: 'tabelapreco' } }]);
  }

}

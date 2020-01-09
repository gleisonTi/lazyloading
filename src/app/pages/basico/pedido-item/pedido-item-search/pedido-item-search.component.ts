import { Component, OnInit, Input, Injector, Output, EventEmitter } from '@angular/core';
import { PedidoItem } from '../shared/pedido-item.model';
import { Produto } from '../../produto/shared/produto.model';
import { ProdutoService } from '../../produto/shared/produto.service';
import { Observable } from 'rxjs';
import { GridDataResult, RowArgs } from '@progress/kendo-angular-grid';
import { GrupoService } from '../../grupo/shared/grupo.service';
import { ReferenciaService } from '../../referencia/shared/referencia.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Grupo } from '../../grupo/shared/grupo.model';
import { createFormGroup } from '../../produto/produto-grid/produto-grid.component';
import { map, tap } from 'rxjs/operators';
import { HotkeysService, Hotkey } from 'angular2-hotkeys';

@Component({
  selector: 'incca-pedido-item-search',
  templateUrl: './pedido-item-search.component.html',
  styleUrls: ['./pedido-item-search.component.scss'],
  providers: [ProdutoService]
})
export class PedidoItemSearchComponent extends BaseResourceGridComponent<Produto> implements OnInit {

  @Input() produtoItensSearch: GridDataResult;
  @Input() tabelaPrecoId: string;
  @Output() setProdutoId = new EventEmitter<Array<string>>();
  @Output() sendItensPedidoItens = new EventEmitter<boolean>();
  public produtoIdlist: Array<string>;
  public grupolist: Grupo[];
  public grupodata: Grupo[];
  public grupoSelect: string;
  public produto: Produto;
  @Output() sendProduto = new EventEmitter<Produto>();
  constructor(
    protected injector: Injector,
    protected produtoService: ProdutoService,
    protected hotkeysService: HotkeysService,
    public grupoService: GrupoService,
    public referenciaService: ReferenciaService,
  ) {
    super(injector, new Produto(), produtoService, createFormGroup);

    this.hotkeysService.add(new Hotkey('enter', (event: KeyboardEvent): boolean => {
      this.emitFunction()
      return false; // Prevent bubbling
    }));
  }
  ngOnInit() {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), '').subscribe(res => { this.helpList = res; });
    this.produtoService.read(this.gridState, this.tabelaPrecoId);
    this.view = this.produtoService;

    if (this.produtoItensSearch) {
      if (this.produtoItensSearch.data.length > 1) {
        console.log('possui itens');
        this.view = this.resourceService.pipe(map(() => {
          return this.produtoItensSearch;
        }));
      }
    }

    this.grupoService.getAll().subscribe(res => {
      this.grupodata = res.data ? res.data : [];
      this.grupolist = res.data ? res.data : [];
    });

  }


  handleFilterGrupo(e) {
    this.grupolist = this.grupodata.filter((item) =>
      item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  changeGrupo(e) {
    this.grupoSelect = e;
    this.gridState.filter.filters = e !== '' ? [{ field: 'GrupoId', operator: 'contains', value: e }] : [];
    this.produtoService.read(this.gridState, this.tabelaPrecoId);
  }

  focusOutFunction(e) {
    if (e !== '') {
      this.gridState.filter.filters = [
        !isNaN(e) ? // se o que foi digitado for número busca por codigo se não busca por descrição
          { field: 'ProdutoCodigo', operator: 'contains', value: e } :
          { field: 'ProdutoDescricao', operator: 'contains', value: e }];
      this.produtoService.read(this.gridState);
    }
  }

  onSelectedChange(e) {
    // this.produto = e.selectedRows[0].dataItem;
  }

  sendItens() {
    this.sendItensPedidoItens.emit(true); // comando passado do filho para o pai para percorrer o array de ProdutoIds
  }

  onSelectedKeysChange(produtoIdlist: Array<string>) {
      this.produtoIdlist = produtoIdlist;
      this.setProdutoId.emit(produtoIdlist);

  }

  doubleClickHandler(e) { // doubleClick para adicionar um item no grid
    this.emitFunction()
  }

  emitFunction(){
    this.setProdutoId.emit(this.produtoIdlist); // array com somente um item
    this.sendItensPedidoItens.emit(true); // para fechar o pesquisar e mostrar o form de adição
  }


}

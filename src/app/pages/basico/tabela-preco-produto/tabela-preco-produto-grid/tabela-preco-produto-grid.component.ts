import { Component, OnInit, Injector, Input } from '@angular/core';
import { TabelaPrecoProduto } from '../shared/tabela-preco-produto.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { TabelaPrecoProdutoService } from '../shared/tabela-preco-produto.service';
import { ProdutoService } from '../../produto/shared/produto.service';
import { TipoCobrancaService } from '../../tipo-cobranca/shared/tipo-cobranca.service';
import { tap, map } from 'rxjs/operators';
import { Grupo } from '../../grupo/shared/grupo.model';
import { GrupoService } from '../../grupo/shared/grupo.service';
import { State } from '@progress/kendo-data-query';


const createFormGroup = (dataItem?: TabelaPrecoProduto) => {
  if (dataItem) {
    return new FormGroup({
      TabelaPrecoProdutoId: new FormControl(dataItem.TabelaPrecoProdutoId),
      TabelaPrecoId: new FormControl(dataItem.TabelaPrecoId),
      ProdutoId: new FormControl(dataItem.ProdutoId),
      TabelaPrecoProdutoValor: new FormControl(dataItem.TabelaPrecoProdutoValor),
      TabelaPrecoProdutoComissao: new FormControl(dataItem.TabelaPrecoProdutoComissao),
    }
    );
  } else {
    return new FormGroup({
      TabelaPrecoProdutoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TabelaPrecoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ProdutoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TabelaPrecoProdutoValor: new FormControl(0, Validators.pattern(/^[\d,.?!]+$/)),
      TabelaPrecoProdutoComissao: new FormControl(0, [Validators.pattern(/^[\d,.?!]+$/)]),
    });
  }
};

@Component({
  selector: 'incca-tabela-preco-produto-grid',
  templateUrl: './tabela-preco-produto-grid.component.html',
  styleUrls: ['./tabela-preco-produto-grid.component.scss']
})

export class TabelaPrecoProdutoGridComponent extends BaseResourceGridComponent<TabelaPrecoProduto> implements OnInit {

  @Input() public tabelaPrecoId: string;
  public grupolist: Grupo[];
  public grupodata: Grupo[];
  public grupoSelect: string;
  public tabelaPrecoProdutoList: TabelaPrecoProduto[] = [];
  constructor(
    protected injector: Injector,
    protected tabelaPrecoProdutoService: TabelaPrecoProdutoService,
    protected produtoService: ProdutoService,
    public grupoService: GrupoService
  ) {
    super(injector, new TabelaPrecoProduto(), tabelaPrecoProdutoService, createFormGroup);
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'TabelaPrecoProduto').subscribe(res => { this.helpList = res; });
    this.produtoService.read(this.gridState, this.tabelaPrecoId);
    this.view = this.produtoService
    this.grupoService.getAll().subscribe(res => {
      this.grupodata = res.data ? res.data : [];
      this.grupolist = res.data ? res.data : [];
    });
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.formGroup.get('TabelaPrecoId').setValue(this.tabelaPrecoId);
    this.resource = TabelaPrecoProduto.fromJson(formGroup.value);
    this.tabelaPrecoProdutoService.produtoPossuiPreco(this.resource.ProdutoId, this.tabelaPrecoId)
      .pipe(map(res => res.containsPrice))// verifica se ja possui registro de preço
      .subscribe(res => { // retorna true ou false
        this.tabelaPrecoProdutoService.save(this.resource, !res) // isNew == res --> s
          .subscribe(() => {
            this.produtoService.read(this.gridState, this.tabelaPrecoId);
          });
      });
    this.closeEditor(sender, this.editedRowIndex);
  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.tabelaPrecoProdutoService.produtoPossuiPreco(dataItem.ProdutoId, this.tabelaPrecoId).subscribe(res => {
      this.formGroup = this.createFormGroupFn(res.TabelaPrecoProduto);
      this.editedRowIndex = rowIndex;
      sender.editRow(rowIndex, this.formGroup);
    });
  }

  handleFilterGrupo(e) {
    this.grupolist = this.grupodata.filter((item) =>
      item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.produtoService.read(this.gridState, this.tabelaPrecoId);
  }

  changeGrupo(e) {
    this.grupoSelect = e;
    this.gridState.filter.filters = e !== '' ? [{ field: 'GrupoId', operator: 'contains', value: e }] : [];
    this.produtoService.read(this.gridState, this.tabelaPrecoId);
  }

  public getValues(produtoId: string, col: string) {
    switch (col) {
      case 'preco':
        let produtopreco: TabelaPrecoProduto;
        produtopreco = this.tabelaPrecoProdutoList.find(item => {
          return item.TabelaPrecoId === this.tabelaPrecoId && item.ProdutoId === produtoId;
        });
        return produtopreco ? produtopreco.TabelaPrecoProdutoValor : '0000';
      case 'comissao':
        let produtoComissao: TabelaPrecoProduto;
        produtoComissao = this.tabelaPrecoProdutoList.find(item => {
          return item.TabelaPrecoId === this.tabelaPrecoId && item.ProdutoId === produtoId;
        });
        return produtoComissao ? produtoComissao.TabelaPrecoProdutoComissao / 100 : '0000';
      default:
        break;
    }
  }

}

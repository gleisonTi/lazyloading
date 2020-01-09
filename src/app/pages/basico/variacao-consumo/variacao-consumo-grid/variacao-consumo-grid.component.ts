import { Component, OnInit, ViewChild, AfterViewInit, Input, Inject, Injector } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VariacaoConsumoService } from '../shared/variacao-consumo.service';
import { Observable } from 'rxjs';
import { GridDataResult, DataStateChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import { State , process} from '@progress/kendo-data-query';
import { map, tap } from "rxjs/operators";
import { VariacaoConsumo } from '../shared/variacao-consumo.model';
import { PedidoComissaoRoutingModule } from '../../pedido-comissao/pedido-comissao-routing.module';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { ProdutoService } from '../../produto/shared/produto.service';
import { ComponenteService } from '../../componente/shared/componente.service';
import { SetorService } from '../../setor/shared/setor.service';
import { UnidadeService } from '../../unidade/shared/unidade.service';
import { Unidade } from '../../unidade/shared/unidade.model';


const createFormGroup = (dataItem?: VariacaoConsumo) => {
  if (dataItem) {
    return new FormGroup({
      VariacaoConsumoId: new FormControl(dataItem.VariacaoConsumoId),
      VariacaoId: new FormControl(dataItem.VariacaoId),
      ProdutoId: new FormControl(dataItem.ProdutoId, Validators.required),
      SetorId: new FormControl(dataItem.SetorId, Validators.required),
      ComponenteId: new FormControl(dataItem.ComponenteId, Validators.required),
      VariacaoConsumoQuantidade: new FormControl( parseFloat(dataItem.VariacaoConsumoQuantidade).toFixed(2)),
    });
  } else {
    return new FormGroup({
      VariacaoConsumoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ProdutoId: new FormControl('', Validators.required),
      SetorId: new FormControl('', Validators.required),
      ComponenteId: new FormControl('', Validators.required),
      VariacaoConsumoQuantidade: new FormControl(0),
    });
  }
};

@Component({
  selector: 'incca-variacao-consumo-grid',
  templateUrl: './variacao-consumo-grid.component.html',
  styleUrls: ['./variacao-consumo-grid.component.scss']
})

export class VariacaoConsumoGridComponent extends BaseResourceGridComponent<VariacaoConsumo> implements OnInit{

  @Input() public dataItemVariacao: any
  public ComponenteList: any[];
  public ProdutoList: any[];
  public SetorList: any[];
  public UnidadeList: Unidade[];
  public names: any[];
  public isEdit: boolean;
  public dataProduto: any[];
  public dataComponente: any[];
  public dataSetor: any[];
  public dataUnidade: Unidade[];

  constructor(
    protected injector: Injector,
    public produtoService: ProdutoService,
    public componenteService: ComponenteService,
    public setorService: SetorService,
    public unidadeService: UnidadeService,
    @Inject(VariacaoConsumoService) editServiceFactory: any,
    public variacaoConsumoService: VariacaoConsumoService
  ) {
    super(injector, new VariacaoConsumo(), variacaoConsumoService = editServiceFactory() , createFormGroup);
  }

  ngOnInit() {

    this.resourceService.getHelp(localStorage.getItem('Seguimento'), this.router.url.replace('/', ''))
    .subscribe(res => {this.helpList = res;});
    this.resourceService.read(this.gridState, this.dataItemVariacao.VariacaoId);
    this.view = this.resourceService;

    this.componenteService.getAll().subscribe(res => {
      this.ComponenteList = res.data;
      this.dataComponente = res.data.slice();
    });
    this.setorService.getAll().subscribe(res => {
      this.SetorList = res.data;
      this.dataSetor = res.data.slice();
    });
    this.produtoService.getAll().subscribe(res => {
      this.ProdutoList = res.data;
      this.dataProduto = this.ProdutoList.slice();
    });

    this.produtoService.getAll().subscribe(res => {
      this.UnidadeList = res.data;
      this.dataUnidade = res.data.slice();
    });
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.variacaoConsumoService.read(this.gridState, this.dataItemVariacao.VariacaoId);
  }

  public getNames(id: number, control: string) {
    switch (control) {
      case "Componente":
        this.names = id
          ? this.ComponenteList.filter(item => item.ComponenteId === id).map(
            item => item.ComponenteDescricao
          )
          : this.ComponenteList.map(item => item.ComponenteDescricao);
        break;
      case "Produto":
        this.names = id
          ? this.ProdutoList.filter(item => item.ProdutoId === id).map(
            item => item.ProdutoDescricao
          )
          : this.ProdutoList.map(item => item.ProdutoDescricao);
        break;
      case "Setor":
        this.names = id
          ? this.SetorList.filter(item => item.SetorId === id).map(
            item => item.SetorDescricao
          )
          : this.SetorList.map(item => item.SetorDescricao);
        break;
      default:
    }
  }

  public onComponentChange(e) {
    this.getNames(e, "Componente");
  }
  public onProdutoChange(e) {
    this.getNames(e, "Produto");
  }
  public onSetorChange(e) {
    this.getNames(e, "Setor");
  }
  public onUnidadeChange(e) {
    this.getNames(e, "Unidade");
  }

  handleProdutoFilter(value: string) {
    this.dataProduto = this.ProdutoList.filter((item) => item.ProdutoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);

  }
  handleComponenteFilter(value: string) {
    this.dataComponente = this.ComponenteList.filter((item) => item.ComponenteDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);

  }
  handleSetorFilter(value: string) {
    this.dataSetor = this.SetorList.filter((item) => item.SetorDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  handleUnidadeFilter(value: string) {
    this.dataUnidade = this.UnidadeList.filter((item) => item.UnidadeDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew,  }): void {
    this.formGroup.get('VariacaoId').setValue(this.dataItemVariacao.VariacaoId);
    console.log(formGroup.value);
    const variacaoConsumo: VariacaoConsumo = VariacaoConsumo.fromJson(formGroup.value);
    console.log(variacaoConsumo);
    this.variacaoConsumoService.save(variacaoConsumo, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }): void {
    this.resource = VariacaoConsumo.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}

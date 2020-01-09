import { Component, OnInit, Inject, Injector, Injectable, ViewChild, ElementRef, AfterViewInit, Input, AfterViewChecked, ChangeDetectorRef, } from '@angular/core';
import { VariacaoService } from '../shared/variacao.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { GridDataResult, DataStateChangeEvent, PageChangeEvent, GridComponent } from '@progress/kendo-angular-grid';
import { map, tap } from 'rxjs/operators';
import { process, State, CompositeFilterDescriptor, DataSourceRequestState, toDataSourceRequestString } from '@progress/kendo-data-query';
import { Variacao } from '../shared/variacao.model';
import { FabricanteService } from '../../fabricante/shared/fabricante.service';
import { ColecaoService } from '../../colecao/shared/colecao.service';
import { Colecao } from '../../colecao/shared/colecao.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { ToastrService } from 'ngx-toastr';
import { PedidoConsumoRoutingModule } from '../../pedido-consumo/pedido-consumo-routing.module';
import { cleanSession } from 'selenium-webdriver/safari';
import { DropDownListComponent } from '@progress/kendo-angular-dropdowns';
import { LoadingService } from 'src/app/shared/services/loading.service';
const help = JSON.parse(localStorage.getItem('helpers'));

const createFormGroup = (dataItem?: Variacao) => {
  if (dataItem) {
    return new FormGroup({
      VariacaoId: new FormControl(dataItem.VariacaoId),
      VariacaoDescricao: new FormControl(dataItem.VariacaoDescricao, Validators.required),
      VariacaoCodigo: new FormControl(dataItem.VariacaoCodigo, Validators.required),
      VariacaoInativo: new FormControl(dataItem.VariacaoInativo),
      VariacaoOrdemTela: new FormControl(dataItem.VariacaoOrdemTela, Validators.pattern(/^[\d,.?!]+$/)),
      VariacaoIdPai: new FormControl(dataItem.VariacaoIdPai),
      FabricanteId: new FormControl(dataItem.FabricanteId),
      ColecaoId: new FormControl(dataItem.ColecaoId),
      VariacaoValorAcrescimo: new FormControl(dataItem.VariacaoValorAcrescimo, Validators.pattern(/^[\d,.?!]+$/))
    });
  } else {
    return new FormGroup({
      VariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoDescricao: new FormControl('', Validators.required),
      VariacaoCodigo: new FormControl('', Validators.required),
      VariacaoInativo: new FormControl(false),
      VariacaoOrdemTela: new FormControl(0, Validators.pattern(/^[\d,.?!]+$/)),
      VariacaoIdPai: new FormControl('00000000-0000-0000-0000-000000000000'),
      FabricanteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ColecaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoValorAcrescimo: new FormControl('', Validators.pattern(/^[\d,.?!]+$/))
    }
    );
  }
};

@Component({
  selector: 'incca-sub-variacao-grid',
  templateUrl: './sub-variacao-grid.component.html',
  styleUrls: ['./sub-variacao-grid.component.scss']
})

@Injectable()
export class SubVariacaoGridComponent extends BaseResourceGridComponent<Variacao> implements OnInit, AfterViewChecked {

  public columns: any[] = [
    { field: 'VariacaoCodigo', title: 'Código' },
    { field: 'VariacaoDescricao', title: 'Descrição' },
    { field: 'VariacaoValorAcrescimo', title: 'Valor acréscimo' },
    { field: 'VariacaoInativo', title: 'Inativo' },

  ];

  @Input() public variacaoIdPai: any;
  @Input() public hasColecao: boolean;
  @Input() public hasFabricacao: boolean;
  @Input() public hasConsumo: boolean;
  @Input() public DescricaoPai: string;
  public variacaoDataItem: Variacao;
  public filter: CompositeFilterDescriptor;
  public gridData: GridDataResult;
  public variacaoPaiList: any[] = [];
  public fabricantesList: any[] = [];
  public colecoesList: any[] = [];
  public names: any[];
  public isEdit: boolean;
  // auxiliares de filtro
  public dataFabricante: any[] = [];
  public dataVariacao: any[] = [];
  public dataColecao: any[] = [];
  // escolha de fabricante e coleção
  public colecaoId: any = '00000000-0000-0000-0000-000000000000'; // guid
  public fabricanteId: any = '00000000-0000-0000-0000-000000000000'; // guid
  // help list
  // edit window
  public openedFabicante = false;
  public openedColecao = false;
  public openedImagem = false;
  public dataSaved = false;


  constructor(protected injector: Injector,
              @Inject(VariacaoService) editServiceFactory: any,
              protected variacaoService: VariacaoService,
              public loadingService: LoadingService,
              public fabricanteService: FabricanteService,
              public colecaoService: ColecaoService,
  ) {
    super(injector, new Variacao(), variacaoService = editServiceFactory(), createFormGroup);
  }

  get loading(){
    return this.loadingService.isLoading();
  }

  public close(window) {
    switch (window) {
      case 'fabricante':
        this.openedFabicante = false;
        this.fabricanteService.getAll().subscribe(res => {// atualiza dropdowlist
          this.fabricantesList = res.data;
          this.dataFabricante = res.data;
        });
        break;
      case 'colecao':
        this.openedColecao = false;
        this.colecaoService.getAll(this.gridState).subscribe(res => { // atualiza dropdowlist
          this.colecoesList = res.data;
          this.dataColecao = res.data;
        });
        break;
      case 'imagem':
        this.openedImagem = false;
        break;
      default:
        break;
    }
  }
  public open(window: string, dataItem?: Variacao) {
    switch (window) {
      case 'fabricante':
        this.openedFabicante = true;
        break;
      case 'colecao':
        this.openedColecao = true;
        break;
      case 'imagem':
        this.openedImagem = true;
        this.variacaoDataItem = dataItem;
        break;
      default:
        break;
    }
  }

  public submit() {
    this.dataSaved = true;
    // this.close();
  }

  ngOnInit() {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'Variacao').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.variacaoIdPai);
    this.view = this.resourceService

    this.fabricanteService.getAll().subscribe(res => {
      this.fabricantesList = res.data;
      this.dataFabricante = res.data;
    });
    this.colecaoService.getAll(this.gridState).subscribe(res => {
      if (res.data !== undefined) {
        this.colecoesList = res.data;
        this.dataColecao = res.data;
      }
    });
    this.variacaoService.getHelp(localStorage.getItem('Seguimento'), 'Variacao').subscribe(res => { this.helpList = res; });

  }


  public onStateChange(state: DataStateChangeEvent) {
    this.gridState = state;
    this.variacaoService.read(this.gridState, this.variacaoIdPai);
  }

  handleFabricanteFilter(value: string) {
    this.dataFabricante = this.fabricantesList.filter((item) => item.FabricanteDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  handleColecaoFilter(value: string) {
    this.dataColecao = this.colecoesList.filter((item) => item.ColecaoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  selectionColecaoChange(e) {
    this.colecaoId = e.ColecaoId;
    if (this.formGroup !== undefined) {
      this.formGroup.controls.ColecaoId.setValue(e.ColecaoId);
    }

  }
  selectionFabricanteChange(e) {
    this.fabricanteId = e.FabricanteId;
    if (this.formGroup !== undefined) {
      this.formGroup.controls.FabricanteId.setValue(e.FabricanteId);
    }
  }

  public parseFloat(string: string) {
    return parseFloat(string);
  }

  public VariacaoPai(id: number): any {
    return this.variacaoPaiList.find(x => x.VariacaoId === id);
  }

  public FabrincanteName(id: string): any {
    return this.fabricantesList.find(x => x.FabricanteId === id);
  }

  public ColecaoName(id: string): any {
    return this.colecoesList.find(x => x.ColecaoId === id);
  }


  public saveHandler({ sender, rowIndex, formGroup, isNew }): void {
    formGroup.get('VariacaoIdPai').setValue(this.variacaoIdPai);
    const variacao: Variacao = Variacao.fromJson(formGroup.value);
    this.variacaoService.save(variacao, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Variacao.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }
  public closeEditor(grid, rowIndex = this.editedRowIndex) {
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
    this.isEdit = false;
  }


}

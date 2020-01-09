import { Component, OnInit, Input, Injector } from '@angular/core';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoConsumo } from '../shared/produto-consumo.model';
import { ProdutoService } from '../../produto/shared/produto.service';
import { UnidadeService } from '../../unidade/shared/unidade.service';
import { SetorService } from '../../setor/shared/setor.service';
import { Produto } from '../../produto/shared/produto.model';
import { Componente } from '../../componente/shared/componente.model';
import { Unidade } from '../../unidade/shared/unidade.model';
import { Setor } from '../../setor/shared/setor.model';
import { ComponenteService } from '../../componente/shared/componente.service';
import { ProdutoConsumoService } from '../shared/produto-consumo.service';

let createFormGroup = (dataItem?: ProdutoConsumo) => {
  if(dataItem){
    return new FormGroup({
      'ProdutoId': new FormControl(dataItem.ProdutoId),
      'ProdutoConsumoId': new FormControl(dataItem.ProdutoId),
      'ProdutoConsumoProdutoId': new FormControl(dataItem.ProdutoId, Validators.required),
      'ComponenteId': new FormControl(dataItem.ProdutoId, Validators.required),
      'SetorId': new FormControl(dataItem.SetorId, Validators.required),
      'SetorCodigo': new FormControl(dataItem.SetorCodigo ),
      'UnidadeId': new FormControl(dataItem.UnidadeId,),
      'ProdutoConsumoQuantidade': new FormControl(dataItem.ProdutoConsumoQuantidade, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    }
    )
  }else{
    return new FormGroup({
      'ProdutoId': new FormControl(''),
      'ComponenteId': new FormControl('',Validators.required),
      'ProdutoConsumoProdutoId': new FormControl('',Validators.required),
      'ProdutoConsumoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'SetorId': new FormControl('',Validators.required),
      'SetorCodigo': new FormControl(0),
      'UnidadeId': new FormControl(''),
      'ProdutoConsumoQuantidade': new FormControl('',Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    })
  }
}
@Component({
  selector: 'incca-produto-consumo-grid',
  templateUrl: './produto-consumo-grid.component.html',
  styleUrls: ['./produto-consumo-grid.component.scss']
})

export class ProdutoConsumoGridComponent extends BaseResourceGridComponent<ProdutoConsumo>  implements  OnInit {

  @Input() produtoId: string
  public dataProduto: Produto[] = [];
  public dataComponente: Componente[] = [];
  public dataUnidade: Unidade[] = [];
  public dataSetor: Setor[] = [];
  public componenteList: Componente[] = [];
  public produtoList: Produto[] = [];
  public unidadeList: Unidade[] = [];
  public setorList: Setor[] = [];

  formGroup: FormGroup
  constructor(
    protected injector: Injector,
    protected produtoConsumoService: ProdutoConsumoService,
    public produtoService: ProdutoService,
    public unidadeService: UnidadeService,
    public setorService: SetorService,
    public componenteService: ComponenteService,
    ) {
    super(injector, new ProdutoConsumo(), produtoConsumoService, createFormGroup)
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'),'ProdutoConsumo').subscribe(res => this.helpList = res)
    this.resourceService.read(this.gridState,this.produtoId)
    this.view = this.resourceService;

    console.log(this.view)

    this.produtoService.getAll().subscribe(res => {
      this.produtoList = res.data
      this.dataProduto = res.data})
    this.unidadeService.getAll().subscribe(res => {
      this.unidadeList = res.data
      this.dataUnidade = res.data})
    this.setorService.getAll().subscribe(res => {
      this.setorList = res.data
      this.dataSetor = res.data})
    this.componenteService.getAll().subscribe(res => {
      this.componenteList = res.data
      this.dataComponente = res.data})
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ProdutoId').setValue(this.produtoId)
    this.resource = ProdutoConsumo.fromJson(formGroup.value)
    console.log(this.resource);
    this.resourceService.save(this.resource ,isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ProdutoConsumo.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public getNameProduto(dataItem: Produto): string {
    return this.produtoList.length !== 0 ? this.produtoList.find(item => item.ProdutoId === dataItem.ProdutoId).ProdutoDescricao : 'carregando'
  }
  public getNameUnidade(dataItem: Unidade) {
    console.log(dataItem);
    console.log(this.unidadeList);
    return this.unidadeList.length !== 0 ? this.unidadeList.find(item => item.UnidadeId === dataItem.UnidadeId).UnidadeDescricao : 'carregando'
  }
  public getNameSetor(dataItem: Setor): string {
    return this.setorList.length !== 0 ? this.setorList.find(item => item.SetorId === dataItem.SetorId).SetorDescricao : 'carregando'
  }
  public getNameComponente(dataItem: Componente): string {
    return this.componenteList.length !== 0 ? this.componenteList.find(item => item.ComponenteId === dataItem.ComponenteId).ComponenteDescricao : 'carregando'
  }

  handleProdutoFilter(value: string) {
    this.dataProduto = this.produtoList.filter((item) => item.ProdutoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  handleUnidadeFilter(value: string) {
//    this.dataUnidade = this.unidadeList.filter((item) => item.UnidadeDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  handleSetorFilter(value: string) {
    this.dataSetor = this.setorList.filter((item) => item.SetorDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
  handleComponenteFilter(value: string) {
    this.dataComponente = this.componenteList.filter((item) => item.ComponenteDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }



}

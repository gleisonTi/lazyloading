import { Component, OnInit, Injector, Injectable, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoComposicao } from '../shared/produto-composicao.model';
import { ProdutoComposicaoService } from '../shared/produto-composicao.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Variacao } from '../../variacao/shared/variacao.model';
import { VariacaoService } from '../../variacao/shared/variacao.service';

let createFormGroup = (dataItem?: ProdutoComposicao) => {
  if(dataItem){
    return new FormGroup({
      'ProdutoId': new FormControl(dataItem.ProdutoId),
      'ProdutoComposicaoId': new FormControl(dataItem.ProdutoComposicaoId),
      'VariacaoId': new FormControl(dataItem.VariacaoId, Validators.required )
    }
    )
  }else{
    return new FormGroup({
      'ProdutoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'ProdutoComposicaoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'VariacaoId': new FormControl('00000000-0000-0000-0000-000000000000', Validators.required),
    })
  }
}
@Component({
  selector: 'incca-produto-composicao-grid',
  templateUrl: './produto-composicao-grid.component.html',
  styleUrls: ['./produto-composicao-grid.component.scss'],
})
@Injectable()
export class ProdutoComposicaoGridComponent extends BaseResourceGridComponent<ProdutoComposicao>  implements  OnInit {

  @Input() produtoId: string
  public dataVariacao: Variacao[] = []
  public variacaoList: Variacao[] = []

  formGroup: FormGroup
  constructor(
    protected injector: Injector,
    protected produtoComposicaoService: ProdutoComposicaoService,
    public variacaoService: VariacaoService
    ) {
    super(injector, new ProdutoComposicao(), produtoComposicaoService, createFormGroup)
  }
  public ngOnInit(): void {

    this.resourceService.getHelp(localStorage.getItem('Seguimento'),'ProdutoComposicao').subscribe(res => this.helpList = res)
    this.resourceService.read(this.gridState,this.produtoId)
    this.view = this.resourceService;
    this.variacaoService.getAll().subscribe(res => {
      this.variacaoList = res.data
      this.dataVariacao = res.data})
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ProdutoId').setValue(this.produtoId)
    this.resource = ProdutoComposicao.fromJson(formGroup.value)
    this.resourceService.save(this.resource ,isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ProdutoComposicao.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public getName(dataItem: Variacao): string {
    return this.variacaoList.length !== 0 ? this.variacaoList.find(item => item.VariacaoId === dataItem.VariacaoId).VariacaoDescricao : 'carregando'
  }

  handleVariacaoFilter(value: string) {
    this.dataVariacao = this.variacaoList.filter((item) => item.VariacaoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public onSetorChange(e) {
    this.variacaoList.filter(item => item.VariacaoId === e)
  }

}

import { Component, OnInit, Injector, Input } from '@angular/core';
import { ProdutoEstoque } from '../shared/produto-estoque.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoEstoqueService } from '../shared/produto-estoque.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Tamanho } from '../../tamanho/shared/tamanho.model';
import { TipoEstoque } from '../../tipo-estoque/shared/tipo-estoque.model';
import { TipoEstoqueService } from '../../tipo-estoque/shared/tipo-estoque.service';
import { TamanhoService } from '../../tamanho/shared/tamanho.service';
import { tap } from 'rxjs/operators';

let createFormGroup = (dataItem?: ProdutoEstoque) => {
  if (dataItem) {
    return new FormGroup({
      'ProdutoId': new FormControl(dataItem.ProdutoId),
      'ProdutoEstoqueArmazenamento': new FormControl(dataItem.ProdutoEstoqueArmazenamento, Validators.required),
      'TamanhoId': new FormControl(dataItem.TamanhoId),
      'ProdutoEstoqueId': new FormControl(dataItem.ProdutoEstoqueId),
      'TipoEstoqueId': new FormControl(dataItem.TipoEstoqueId, [Validators.required]),
      'ProdutoEstoqueQuantidade': new FormControl(parseFloat(dataItem.ProdutoEstoqueQuantidade).toFixed(2), [Validators.required, Validators.min(0)]),
    }
    )
  } else {
    return new FormGroup({
      'ProdutoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'ProdutoEstoqueArmazenamento': new FormControl('', Validators.required),
      'ProdutoEstoqueId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'TamanhoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'TipoEstoqueId': new FormControl('00000000-0000-0000-0000-000000000000', [Validators.required]),
      'ProdutoEstoqueQuantidade': new FormControl(0, [Validators.required, Validators.min(0)])
    })
  }
}
@Component({
  selector: 'incca-produto-estoque-grid',
  templateUrl: './produto-estoque-grid.component.html',
  styleUrls: ['./produto-estoque-grid.component.scss']
})
export class ProdutoEstoqueGridComponent extends BaseResourceGridComponent<ProdutoEstoque> implements OnInit {
  @Input() produtoId: string
  @Input() gradeId: string

  public dataTamanho: Tamanho[] = [];
  public tamanhoList: Tamanho[] = [];

  public dataTipoEstoque: TipoEstoque[] = [];
  public tipoEstoqueList: TipoEstoque[] = [];

  constructor(
    protected injector: Injector,
    protected produtoEstoqueService: ProdutoEstoqueService,
    protected tipoEstoqueService: TipoEstoqueService,
    protected tamanhoService: TamanhoService
  ) {
    super(injector, new ProdutoEstoque(), produtoEstoqueService, createFormGroup)
  }
  public ngOnInit(): void {


    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ProdutoEstoque')
      .subscribe(res => { this.helpList = res; }) // help utilizado na classe principal
    this.produtoEstoqueService.read(this.gridState, this.produtoId)
    this.view = this.produtoEstoqueService;
    this.view.subscribe(res => console.log(res));

    this.tipoEstoqueService.getAll().subscribe(res => {
      this.tipoEstoqueList = res.data
      this.dataTipoEstoque = res.data
    });
    this.tamanhoService.getAll(null, this.gradeId).subscribe(res => {
      this.tamanhoList = res.data
      this.dataTamanho = res.data
    });
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ProdutoId').setValue(this.produtoId)
    this.resource = ProdutoEstoque.fromJson(formGroup.value)
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ProdutoEstoque.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getNameTamanho(dataItem: Tamanho): string {
    return this.tamanhoList.length !== 0 ? this.tamanhoList.find(item => item.GradeId === dataItem.GradeId).Tamanho : 'carregando'
  }

  public getNameTipoEstoque(dataItem: TipoEstoque): string {
    return this.tipoEstoqueList.length !== 0 ? this.tipoEstoqueList.find(item => item.TipoEstoqueId === dataItem.TipoEstoqueId).TipoEstoqueDescricao : 'carregando'
  }

  handleTamanhoFilter(value: string) {
    this.dataTamanho = this.tamanhoList.filter((item) => item.Tamanho.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  handleTipoEstoqueFilter(value: string) {
    this.dataTipoEstoque = this.tipoEstoqueList.filter((item) => item.TipoEstoqueDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }


}

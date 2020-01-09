import { Component, OnInit, Input, Injector } from '@angular/core';
import { TipoEstoque } from '../shared/tipo-estoque.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TipoEstoqueService } from '../shared/tipo-estoque.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';

let createFormGroup = (dataItem?: TipoEstoque) => {
  if(dataItem){
    return new FormGroup({
      'TipoEstoqueId': new FormControl(dataItem.TipoEstoqueId),
      'TipoEstoqueDescricao': new FormControl(dataItem.TipoEstoqueDescricao, Validators.required ),

    }
    )
  }else{
    return new FormGroup({
      'TipoEstoqueId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'TipoEstoqueDescricao': new FormControl('', Validators.required),

    })
  }
}
@Component({
  selector: 'incca-tipo-estoque',
  templateUrl: './tipo-estoque.component.html',
  styleUrls: ['./tipo-estoque.component.scss']
})
export class TipoEstoqueComponent extends BaseResourceGridComponent<TipoEstoque>  implements  OnInit {
  @Input() produtoId: string
  constructor(protected injector: Injector, protected tipoEstoqueService: TipoEstoqueService) {
    super(injector, new TipoEstoque(), tipoEstoqueService, createFormGroup)
  }
  public ngOnInit(): void {
    super.ngOnInit()

  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = TipoEstoque.fromJson(formGroup.value)
    this.resourceService.save(this.resource , isNew)
    sender.closeRow(rowIndex);
  }
  public removeHandler({ dataItem }) {
    this.resource = TipoEstoque.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }
}

import { pedidoItemForm } from './../../../basico/pedido-item/pedido-item-grid/pedido-item-grid.component';
import { MovEstoqueQtdeService } from './../shared/mov-estoque-qtde.service';
import { Component, OnInit, Injector, Input } from '@angular/core';
import { MovEstoqueQtde } from '../shared/mov-estoque-qtde.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Colecao } from 'src/app/pages/basico/colecao/shared/colecao.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'incca-mov-estoque-qtde-grid',
  templateUrl: './mov-estoque-qtde-grid.component.html',
  styleUrls: ['./mov-estoque-qtde-grid.component.scss']
})
export class MovEstoqueQtdeGridComponent extends BaseResourceGridComponent<MovEstoqueQtde> implements OnInit {

  @Input() public produtoId: string;

  constructor(protected injector: Injector, protected movEstoqueQtdeService: MovEstoqueQtdeService) {
    super(injector, new MovEstoqueQtde(), movEstoqueQtdeService, createFormGroup);
  }
  public ngOnInit(): void {

    console.log(this.produtoId);
    this.movEstoqueQtdeService.read(this.gridState, this.produtoId);
    this.view = this.movEstoqueQtdeService;

  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.resourceService.read(this.gridState, this.produtoId);
  }


  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = MovEstoqueQtde.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = MovEstoqueQtde.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}

const createFormGroup = (dataItem?: MovEstoqueQtde) => {
  if (dataItem) {
    return new FormGroup({
      MovEstoqueQtdeId: new FormControl(dataItem.MovEstoqueQtdeId),
      MovEstoqueId: new FormControl(dataItem.MovEstoqueId, Validators.required),
      TamanhoId: new FormControl(dataItem.TamanhoId),
      TipoEstoqueId: new FormControl(dataItem.TipoEstoqueId),
      MovEstoqueQtdeAnterior: new FormControl(dataItem.MovEstoqueQtdeAnterior),
      MovEstoqueQuantidade: new FormControl(dataItem.MovEstoqueQuantidade),
      MovEstoqueQtdeData: new FormControl(dataItem.MovEstoqueQtdeData),
      MovEstoqueQtdeUsuario: new FormControl(dataItem.MovEstoqueQtdeUsuario),
    }
    );
  } else {
    return new FormGroup({
      MovEstoqueQtdeId: new FormControl(''),
      MovEstoqueId: new FormControl(''),
      TamanhoId: new FormControl(''),
      TipoEstoqueId: new FormControl(''),
      MovEstoqueQtdeAnterior: new FormControl(''),
      MovEstoqueQuantidade: new FormControl(''),
      MovEstoqueQtdeData: new FormControl(''),
      MovEstoqueQtdeUsuario: new FormControl(''),
    });
  }
};




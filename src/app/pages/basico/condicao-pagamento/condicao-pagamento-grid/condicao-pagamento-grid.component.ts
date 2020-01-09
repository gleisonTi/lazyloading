import { Component, OnInit, Injector } from '@angular/core';
import { CondicaoPagamento } from '../shared/condicao-pagamento.model';
import { CondicaoPagamentoService } from '../shared/condicao-pagamento.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';

const createFormGroup = (dataItem?: CondicaoPagamento) => {
  if (dataItem) {
    return new FormGroup({
      CondicaoPagamentoId: new FormControl(dataItem.CondicaoPagamentoId),
      CondicaoPagamentoDescricao: new FormControl(dataItem.CondicaoPagamentoDescricao, Validators.required),
    });
  } else {
    return new FormGroup({
      CondicaoPagamentoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      CondicaoPagamentoDescricao: new FormControl('', Validators.required),
    });
  }
};


@Component({
  selector: 'incca-condicao-pagamento-grid',
  templateUrl: './condicao-pagamento-grid.component.html',
  styleUrls: ['./condicao-pagamento-grid.component.scss']
})
export class CondicaoPagamentoGridComponent extends BaseResourceGridComponent<CondicaoPagamento> implements OnInit {

  constructor(protected injector: Injector, protected condicaoPagamentoService: CondicaoPagamentoService) {
    super(injector, new CondicaoPagamento(), condicaoPagamentoService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = CondicaoPagamento.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = CondicaoPagamento.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}

import { Component, OnInit, Injector } from '@angular/core';
import { Despesa } from '../shared/despesa.model';
import { DespesaService } from '../shared/despesa.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Validators, FormControl, FormGroup } from '@angular/forms';


const createFormGroup = (dataItem?: Despesa) => {
  if (dataItem) {
    return new FormGroup({
      DespesaId: new FormControl(dataItem.DespesaId),
      DespesaDescricao: new FormControl(dataItem.DespesaDescricao, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      DespesaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      DespesaDescricao: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-despesa-grid',
  templateUrl: './despesa-grid.component.html',
  styleUrls: ['./despesa-grid.component.scss']
})
export class DespesaGridComponent extends BaseResourceGridComponent<Despesa> implements OnInit {

  constructor(protected injector: Injector, protected despesaService: DespesaService) {
    super(injector, new Despesa(), despesaService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Despesa.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Despesa.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}


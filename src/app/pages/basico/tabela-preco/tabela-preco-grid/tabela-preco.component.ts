import { Component, OnInit, Injector } from '@angular/core';
import { TabelaPreco } from '../shared/tabela-preco.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TabelaPrecoService } from '../shared/tabela-preco.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';

const createFormGroup = (dataItem?: TabelaPreco) => {
  if (dataItem) {
    return new FormGroup({
      TabelaPrecoId: new FormControl(dataItem.TabelaPrecoId),
      TabelaPrecoDescricao: new FormControl(dataItem.TabelaPrecoDescricao, Validators.required),
      TabelaPrecoValidade: new FormControl(dataItem.TabelaPrecoValidade, Validators.required),
    });
  } else {
    return new FormGroup({
      TabelaPrecoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TabelaPrecoDescricao: new FormControl('', Validators.required),
      TabelaPrecoValidade: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-tabela-preco',
  templateUrl: './tabela-preco.component.html',
  styleUrls: ['./tabela-preco.component.scss']
})

export class TabelaPrecoComponent extends BaseResourceGridComponent<TabelaPreco> implements OnInit {

  public view?: Observable<GridDataResult>;
  constructor(protected injector: Injector, protected tabelaPrecoService: TabelaPrecoService) {
    super(injector, new TabelaPreco(), tabelaPrecoService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = TabelaPreco.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = TabelaPreco.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}

import { Component, OnInit, Injector } from '@angular/core';
import { TipoCobranca } from '../shared/tipo-cobranca.model';
import { TipoCobrancaService } from '../shared/tipo-cobranca.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const createFormGroup = (dataItem?: TipoCobranca) => {
  if (dataItem) {
    return new FormGroup({
      TipoCobrancaId: new FormControl(dataItem.TipoCobrancaId),
      TipoCobrancaDescricao: new FormControl(dataItem.TipoCobrancaDescricao, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      TipoCobrancaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TipoCobrancaDescricao: new FormControl('', Validators.required),
    });
  }
};
@Component({
  selector: 'incca-tipo-cobranca',
  templateUrl: './tipo-cobranca.component.html',
  styleUrls: ['./tipo-cobranca.component.scss']
})
export class TipoCobrancaComponent extends BaseResourceGridComponent<TipoCobranca> implements OnInit {

  public view?: Observable<GridDataResult>;
  constructor(protected injector: Injector, protected tipoCobrancaService: TipoCobrancaService) {
    super(injector, new TipoCobranca(), tipoCobrancaService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = TipoCobranca.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = TipoCobranca.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}
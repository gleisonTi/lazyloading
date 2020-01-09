import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { TipoContato } from '../shared/tipo-contato.model';
import { TipoContatoService } from '../shared/tipo-contato.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';


const createFormGroup = (dataItem?: TipoContato) => {
  if (dataItem) {
    return new FormGroup({
      TipoContatoId: new FormControl(dataItem.TipoContatoId),
      TipoContatoDescricao: new FormControl(dataItem.TipoContatoDescricao, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      TipoContatoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TipoContatoDescricao: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-tipo-contato-grid',
  templateUrl: './tipo-contato-grid.component.html',
  styleUrls: ['./tipo-contato-grid.component.scss']
})
export class TipoContatoGridComponent extends BaseResourceGridComponent<TipoContato> implements OnInit {

  @Output() updateGrid = new EventEmitter<boolean>()
  public view?: Observable<GridDataResult>;
  constructor(protected injector: Injector, protected tipoContatoService: TipoContatoService) {
    super(injector, new TipoContato(), tipoContatoService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
    this.resourceService.getAll().subscribe(res => console.log(res));
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = TipoContato.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    this.updateGrid.emit(true)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = TipoContato.fromJson(dataItem);
    this.resourceService.remove(this.resource);
    this.updateGrid.emit(true)
  }

}

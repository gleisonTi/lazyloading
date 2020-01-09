import { Component, OnInit, Injector, Inject, AfterViewInit } from '@angular/core';
import { Atributo } from '../shared/atributo.model';
import { AtributoService } from '../shared/atributo.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const createFormGroup = (dataItem?: Atributo) => {
  if (dataItem) {
    return new FormGroup({
      AtributoId: new FormControl(dataItem.AtributoId),
      AtributoIdPai: new FormControl(dataItem.AtributoIdPai),
      AtributoDescricao: new FormControl(dataItem.AtributoDescricao, [Validators.required]),
      AtributoDescricaoPai: new FormControl(dataItem.AtributoDescricaoPai),
      AtributoPadrao: new FormControl(dataItem.AtributoPadrao),
      AtributoOrdem: new FormControl(dataItem.AtributoOrdem,[Validators.min(1)]),
      AtributoTexto: new FormControl(dataItem.AtributoTexto),
    }
    );
  } else {
    return new FormGroup({
      AtributoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoIdPai: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoDescricao: new FormControl('',[Validators.required]),
      AtributoDescricaoPai: new FormControl(''),
      AtributoPadrao: new FormControl(false),
      AtributoOrdem: new FormControl(1,[Validators.min(1)]),
      AtributoTexto: new FormControl(''),
    });
  }
};
@Component({
  selector: 'incca-atributo-grid',
  templateUrl: './atributo-grid.component.html',
  styleUrls: ['./atributo-grid.component.scss']
})
export class AtributoGridComponent extends BaseResourceGridComponent<Atributo> implements OnInit {

  public maxOrdem :number = 0 ;
  constructor(
    protected injector: Injector,
    @Inject(AtributoService) editServiceFactory: any,
    public atributoService: AtributoService
  ) {
    super(injector, new Atributo(), atributoService = editServiceFactory() , createFormGroup);

  }
  public ngOnInit(): void {
    super.ngOnInit();

  }


  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Atributo.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Atributo.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroupFn();

    this.atributoService.getNewOrdemAtributo().subscribe(res => {
      this.maxOrdem = res.Codigo
      this.formGroup.controls['AtributoOrdem'].setValidators([Validators.min(res.Codigo)]);
      this.formGroup.controls['AtributoOrdem'].updateValueAndValidity();
      this.formGroup.get('AtributoOrdem').setValue(res.Codigo);
    });
    sender.addRow(this.formGroup);
  }

}

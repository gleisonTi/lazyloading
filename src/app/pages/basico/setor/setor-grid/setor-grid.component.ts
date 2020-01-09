import { Component, OnInit, Injector } from '@angular/core';
import { SetorService } from '../shared/setor.service';
import { Setor } from '../shared/setor.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const createFormGroup = (dataItem?: Setor) => {
  if (dataItem) {
    return new FormGroup({
      SetorId: new FormControl(dataItem.SetorId),
      SetorDescricao: new FormControl(dataItem.SetorDescricao, Validators.required),
      SetorCodigo: new FormControl(dataItem.SetorCodigo),
      SetorAbreviacao: new FormControl(dataItem.SetorAbreviacao),
    }
    );
  } else {
    return new FormGroup({
      SetorId: new FormControl('00000000-0000-0000-0000-000000000000'),
      SetorDescricao: new FormControl('', Validators.required),
      SetorCodigo: new FormControl('', Validators.required),
      SetorAbreviacao: new FormControl(''),
    });
  }
};

@Component({
  selector: 'incca-setor-grid',
  templateUrl: './setor-grid.component.html',
  styleUrls: ['./setor-grid.component.scss']
})
export class SetorGridComponent  extends BaseResourceGridComponent<Setor> implements OnInit {
  public maxOrdem :number = 0 ;

  constructor(protected injector: Injector, protected setorService: SetorService) {
    super(injector, new Setor(), setorService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Setor.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Setor.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroupFn();

    this.setorService.getNewSetorCodigo().subscribe(res => {
      this.maxOrdem = res.Codigo
      this.formGroup.controls['SetorCodigo'].setValidators([Validators.min(res.Codigo)]);
      this.formGroup.controls['SetorCodigo'].updateValueAndValidity();
      this.formGroup.get('SetorCodigo').setValue(res.Codigo);
    });
    sender.addRow(this.formGroup);
  }


}



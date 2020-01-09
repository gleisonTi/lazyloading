import { Component, OnInit, Injector, Input, Inject } from '@angular/core';
import { Atributo } from '../shared/atributo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { AtributoService } from '../shared/atributo.service';
import { GridComponent } from '@progress/kendo-angular-grid';
import { tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
const createFormGroup = (dataItem?: Atributo) => {
  if (dataItem) {
    return new FormGroup({
      AtributoId: new FormControl(dataItem.AtributoId),
      AtributoIdPai: new FormControl(dataItem.AtributoIdPai),
      AtributoDescricao: new FormControl(dataItem.AtributoDescricao),
      AtributoDescricaoPai: new FormControl(dataItem.AtributoDescricaoPai),
      AtributoOrdem: new FormControl(dataItem.AtributoOrdem),
      AtributoTexto: new FormControl(dataItem.AtributoTexto),
    }
    );
  } else {
    return new FormGroup({
      AtributoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoIdPai: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoDescricao: new FormControl(''),
      AtributoDescricaoPai: new FormControl(''),
      AtributoOrdem: new FormControl(0),
      AtributoTexto: new FormControl(''),
    });
  }
};
@Component({
  selector: 'incca-sub-atributo-grid',
  templateUrl: './sub-atributo-grid.component.html',
  styleUrls: ['./sub-atributo-grid.component.scss']
})
export class SubAtributoGridComponent extends BaseResourceGridComponent<Atributo> implements OnInit {

  @Input() atributoIdPai = '';
  public editText = false ;
  public maxOrdem :number = 0 ;


  constructor(
    protected injector: Injector,
    @Inject(AtributoService) editServiceFactory: any,
    public atributoService: AtributoService
  ) {
    super(injector, new Atributo(), atributoService = editServiceFactory() , createFormGroup);
  }


  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), this.router.url.replace('/', ''))
    .subscribe(res => {this.helpList = res;});
    this.resourceService.read(this.gridState, this.atributoIdPai);
    this.view = this.resourceService

  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('AtributoIdPai').setValue(this.atributoIdPai);
    this.resource = Atributo.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
    sender.collapseRow(rowIndex);
    this.editText = false;

  }

  public editHandler({ sender, rowIndex, dataItem }) {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroupFn(dataItem);
    this.editText = true; // habilita a edição do texto do atributo
    sender.editRow(rowIndex, this.formGroup);
    sender.expandRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Atributo.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.resourceService.read(this.gridState, this.atributoIdPai);
  }


  public cancelHandler({ sender, rowIndex }) {
    sender.collapseRow(rowIndex);
    this.editText = false;
    this.closeEditor(sender, rowIndex);
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.formGroup = this.createFormGroupFn();
    this.atributoService.getNewOrdemAtributo(this.atributoIdPai).subscribe(res => {
      this.maxOrdem = res.Codigo;
      this.formGroup.controls['AtributoOrdem'].setValidators([Validators.min(res.Codigo)]);
      this.formGroup.controls['AtributoOrdem'].updateValueAndValidity();
      this.formGroup.get('AtributoOrdem').setValue(res.Codigo);
    });
    sender.addRow(this.formGroup);
  }

}

import { Component, OnInit, Injector, Input, Inject } from '@angular/core';
import { Tamanho } from '../shared/tamanho.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grade } from '../../grade/shared/grade.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { GradeService } from '../../grade/shared/grade.service';
import { TamanhoService } from '../shared/tamanho.service';
import { map } from 'rxjs/operators';

let createFormGroup = (dataItem?: Tamanho) => {
  if(dataItem){
    return new FormGroup({
      'TamanhoId': new FormControl(dataItem.TamanhoId),
      'GradeId': new FormControl(dataItem.GradeId,),
      'TamanhoPercentualAumento': new FormControl(dataItem.TamanhoPercentualAumento, ),
      'TamanhoVariacaoConsumo': new FormControl(dataItem.TamanhoVariacaoConsumo, ),
      'Tamanho': new FormControl(dataItem.Tamanho, Validators.required )
    }
    )
  }else{
    return new FormGroup({
      'TamanhoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'GradeId': new FormControl('',),
      'TamanhoPercentualAumento': new FormControl(0),
      'TamanhoVariacaoConsumo': new FormControl(0),
      'Tamanho': new FormControl('', Validators.required),
    })
  }
}
@Component({
  selector: 'incca-tamanho-grid',
  templateUrl: './tamanho-grid.component.html',
  styleUrls: ['./tamanho-grid.component.scss']
})
export class TamanhoGridComponent extends BaseResourceGridComponent<Tamanho>  implements  OnInit {

  @Input() gradeId :string
  formGroup: FormGroup
  constructor(
    protected injector: Injector,
    @Inject(TamanhoService) editServiceFactory: any,
    public tamanhoService: TamanhoService,
    public gradeService: GradeService
    ) {
    super(injector, new Tamanho(), tamanhoService = editServiceFactory(), createFormGroup)
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'),'Tamanho').subscribe(res => {console.log(res);this.helpList = res})
    this.resourceService.read(this.gridState, this.gradeId)
    this.view = this.resourceService.pipe(map(res => { return res} ));

  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.formGroup.get('GradeId').setValue(this.gradeId)
    this.resource = Tamanho.fromJson(formGroup.value)
    this.resourceService.save(this.resource ,isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Tamanho.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

}

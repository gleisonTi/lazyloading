import { Component, OnInit, Injector, Inject } from '@angular/core';
import { Grade } from '../shared/grade.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GradeService } from '../shared/grade.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';

let createFormGroup = (dataItem?: Grade) => {
  if(dataItem){
    return new FormGroup({
      'GradeId': new FormControl(dataItem.GradeId),
      'GradeDescricao': new FormControl(dataItem.GradeDescricao, Validators.required),
    }
    )
  }else{
    return new FormGroup({
      'GradeId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'GradeDescricao': new FormControl('', Validators.required),
    })
  }
}
@Component({
  selector: 'incca-grade-grid',
  templateUrl: './grade-grid.component.html',
  styleUrls: ['./grade-grid.component.scss']
})
export class GradeGridComponent extends BaseResourceGridComponent<Grade> implements OnInit {

  public view?: Observable<GridDataResult>;
  constructor(
    @Inject(GradeService) editServiceFactory: any,
    protected injector: Injector, public gradeService: GradeService) {
    super(injector, new Grade(), gradeService = editServiceFactory(), createFormGroup)
  }

  public ngOnInit(): void {
    super.ngOnInit()
    console.log(this.view);
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Grade.fromJson(formGroup.value)
    console.log(this.formGroup);
    this.resourceService.save(this.resource , isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Grade.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

}

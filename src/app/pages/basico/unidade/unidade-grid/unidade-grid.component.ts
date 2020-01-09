import { Component, OnInit, Injector } from '@angular/core';
import { Unidade } from '../shared/unidade.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UnidadeService } from '../shared/unidade.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';

const createFormGroup = (dataItem?: Unidade) => {
  if (dataItem) {
    return new FormGroup({
      UnidadeId: new FormControl(dataItem.UnidadeId),
      UnidadeDescricao: new FormControl(dataItem.UnidadeDescricao, Validators.required),
      UnidadeAbreviatura: new FormControl(dataItem.UnidadeAbreviatura),
      UnidadeUtilizaGrade: new FormControl(dataItem.UnidadeUtilizaGrade),
    }
    );
  } else {
    return new FormGroup({
      UnidadeId: new FormControl('00000000-0000-0000-0000-000000000000'),
      UnidadeDescricao: new FormControl('', Validators.required),
      UnidadeAbreviatura: new FormControl('',Validators.required ),
      UnidadeUtilizaGrade: new FormControl(false),
    });
  }
};

@Component({
  selector: 'incca-unidade-grid',
  templateUrl: './unidade-grid.component.html',
  styleUrls: ['./unidade-grid.component.scss']
})
export class UnidadeGridComponent extends BaseResourceGridComponent<Unidade> implements OnInit {

  constructor(protected injector: Injector, protected unidadeService: UnidadeService) {
    super(injector, new Unidade(), unidadeService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Unidade.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public criarAbreviacao(e: string) {
    this.formGroup.get("UnidadeAbreviatura").setValue(e.substring(2,0));
  }

  public removeHandler({ dataItem }) {
    this.resource = Unidade.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}


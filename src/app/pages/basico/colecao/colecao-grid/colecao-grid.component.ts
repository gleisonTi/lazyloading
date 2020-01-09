import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Inject, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, process } from '@progress/kendo-data-query';

import { Colecao } from '../shared/colecao.model';
import { TodoService } from '../shared/todo.service';
import { ColecaoService } from '../shared/colecao.service';

import { map } from 'rxjs/operators/map';

import { BehaviorSubject } from 'rxjs';
import { BaseResourceGridComponent } from '../../../../shared/components/base-resource-grid/base-resource-grid.component';
import { tap } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3';

const createFormGroup = (dataItem?: Colecao) => {
  if (dataItem) {
    return new FormGroup({
      ColecaoId: new FormControl(dataItem.ColecaoId),
      ColecaoDescricao: new FormControl(dataItem.ColecaoDescricao, Validators.required),
      ColecaoInativo: new FormControl(dataItem.ColecaoInativo),
    }
    );
  } else {
    return new FormGroup({
      ColecaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ColecaoDescricao: new FormControl('', Validators.required),
      ColecaoInativo: new FormControl(false),
    });
  }
};
@Component({
  selector: 'incca-colecao-grid',
  templateUrl: './colecao-grid.component.html',
  styleUrls: ['./colecao-grid.component.scss']
})

export class ColecaoGridComponent extends BaseResourceGridComponent<Colecao> implements OnInit {

  constructor(protected injector: Injector, protected colecaoService: ColecaoService) {
    super(injector, new Colecao(), colecaoService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Colecao.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Colecao.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}



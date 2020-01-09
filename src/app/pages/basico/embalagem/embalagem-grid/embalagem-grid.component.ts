import { EmbalagemService } from './../shared/embalagem.service';
import { Component, OnInit, Injector } from '@angular/core';
import { Embalagem } from '../shared/embalagem.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';


const createFormGroup = (dataItem?: Embalagem) => {
  if (dataItem) {
    return new FormGroup({
      EmbalagemId: new FormControl(dataItem.EmbalagemId),
      EmbalagemDescricao: new FormControl(dataItem.EmbalagemDescricao, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      EmbalagemId: new FormControl('00000000-0000-0000-0000-000000000000'),
      EmbalagemDescricao: new FormControl("", Validators.required),
    });
  }
}

@Component({
  selector: 'incca-embalagem-grid',
  templateUrl: './embalagem-grid.component.html',
  styleUrls: ['./embalagem-grid.component.scss']
})
export class EmbalagemGridComponent extends BaseResourceGridComponent<Embalagem> implements OnInit {

  constructor(protected injector: Injector, protected embalagemService: EmbalagemService) {
    super(injector, new Embalagem(), embalagemService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Embalagem.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Embalagem.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}



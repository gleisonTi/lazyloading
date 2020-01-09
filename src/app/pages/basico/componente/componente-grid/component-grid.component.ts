import { ComponenteService } from './../shared/componente.service';
import { Componente } from './../shared/componente.model';
import { Component, OnInit, Injector } from '@angular/core';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

const createFormGroup = (dataItem?: Componente) => {
  if (dataItem) {
    return new FormGroup({
      ComponenteId: new FormControl(dataItem.ComponenteId),
      ComponenteDescricao: new FormControl(dataItem.ComponenteDescricao, Validators.required)
    }
    );
  } else {
    return new FormGroup({
      ComponenteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ComponenteDescricao: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-componente-grid',
  templateUrl: './componente-grid.component.html',
  styleUrls: ['./componente-grid.component.scss']
})
export class ComponenteGridComponent extends BaseResourceGridComponent<Componente> implements OnInit {

  constructor(protected injector: Injector, protected componenteService: ComponenteService) {
    super(injector, new Componente(), componenteService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Componente.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Componente.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}
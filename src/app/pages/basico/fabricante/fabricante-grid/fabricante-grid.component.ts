import { Component, OnInit, Injector } from '@angular/core';
import { FabricanteService } from '../shared/fabricante.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { State, process } from '@progress/kendo-data-query';
import { map } from 'rxjs/operators';
import { GridDataResult, DataStateChangeEvent } from '@progress/kendo-angular-grid';
import { VariacaoRoutingModule } from '../../variacao/variacao-routing.module';
import { ClassGetter } from '@angular/compiler/src/output/output_ast';

import { filterBy, FilterDescriptor, CompositeFilterDescriptor, distinct } from '@progress/kendo-data-query';
import { Fabricante } from '../shared/fabricante.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';



const createFormGroup = (dataItem?: Fabricante) => {
  if (dataItem) {
    return new FormGroup({
      FabricanteId: new FormControl(dataItem.FabricanteId),
      FabricanteDescricao: new FormControl(dataItem.FabricanteDescricao, Validators.required),
      FabricanteUsuario: new FormControl(dataItem.FabricanteUsuario),
      FabricanteData: new FormControl(dataItem.FabricanteData),
      FabricanteHora: new FormControl(dataItem.FabricanteHora)
    }
    );
  } else {
    return new FormGroup({
      FabricanteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      FabricanteDescricao: new FormControl('', Validators.required),
      FabricanteUsuario: new FormControl(''),
      FabricanteData: new FormControl(''),
      FabricanteHora: new FormControl('')
    });
  }
};
@Component({
  selector: 'incca-fabricante-grid',
  templateUrl: './fabricante-grid.component.html',
  styleUrls: ['./fabricante-grid.component.scss']
})

export class FabricanteGridComponent extends BaseResourceGridComponent<Fabricante> implements OnInit {

  public view?: Observable<GridDataResult>;
  constructor(protected injector: Injector, protected fabricanteService: FabricanteService) {
    super(injector, new Fabricante(), fabricanteService, createFormGroup)
  }
  public ngOnInit(): void {
    super.ngOnInit()
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Fabricante.fromJson(formGroup.value)
    this.resourceService.save(this.resource , isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Fabricante.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

}






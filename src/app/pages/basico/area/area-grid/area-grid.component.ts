import { Component, OnInit, Injector } from '@angular/core';
import { AreaService } from '../shared/area.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Area } from '../shared/area.model';
import { Validators, FormControl, FormGroup } from '@angular/forms';


const createFormGroup = (dataItem?: Area) => {
  if (dataItem) {
    return new FormGroup({
      AreaId: new FormControl(dataItem.AreaId),
      AreaDescricao: new FormControl(dataItem.AreaDescricao, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      AreaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AreaDescricao: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-area-grid',
  templateUrl: './area-grid.component.html',
  styleUrls: ['./area-grid.component.scss']
})
export class AreaGridComponent extends BaseResourceGridComponent<Area> implements OnInit {

  constructor(protected injector: Injector, protected areaService: AreaService) {
    super(injector, new Area(), areaService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Area.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Area.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}


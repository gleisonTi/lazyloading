import { Component, OnInit, Injector } from '@angular/core';
import { Banco } from '../shared/banco.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BancoService } from '../shared/banco.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';


const createFormGroup = (dataItem?: Banco) => {
  if (dataItem) {
    return new FormGroup({
      BancoId: new FormControl(dataItem.BancoId),
      BancoDescricao: new FormControl(dataItem.BancoDescricao, Validators.required),
      BancoNumero: new FormControl(dataItem.BancoNumero, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      BancoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      BancoDescricao: new FormControl('', Validators.required),
      BancoNumero: new FormControl('', Validators.required),
    });
  }
};

@Component({
  selector: 'incca-banco-grid',
  templateUrl: './banco-grid.component.html',
  styleUrls: ['./banco-grid.component.scss']
})
export class BancoGridComponent extends BaseResourceGridComponent<Banco> implements OnInit {

  constructor(protected injector: Injector, protected bancoService: BancoService) {
    super(injector, new Banco(), bancoService, createFormGroup);
  }
  public ngOnInit(): void {
    super.ngOnInit();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Banco.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Banco.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}

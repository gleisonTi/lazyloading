import { Component, OnInit, Injectable, Input, Injector } from '@angular/core';
import { GrupoAtributo } from '../shared/grupo-atributo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Atributo } from '../../atributo/shared/atributo.model';
import { AtributoService } from '../../atributo/shared/atributo.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { GrupoAtributoService } from '../shared/grupo-atributo.service';
import { tap } from 'rxjs/operators';


const createFormGroup = (dataItem?: GrupoAtributo) => {
  if (dataItem) {
    return new FormGroup({
      GrupoId: new FormControl(dataItem.GrupoId),
      GrupoAtributoId: new FormControl(dataItem.GrupoAtributoId),
      AtributoId: new FormControl(dataItem.AtributoId, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      GrupoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoAtributoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoId: new FormControl('00000000-0000-0000-0000-000000000000'),
    });
  }
};

@Component({
  selector: 'incca-grupo-atributo-grid',
  templateUrl: './grupo-atributo-grid.component.html',
  styleUrls: ['./grupo-atributo-grid.component.scss'],
  providers : [ AtributoService ]
})

@Injectable()
export class GrupoAtributoGridComponent extends BaseResourceGridComponent<GrupoAtributo> implements OnInit {

  @Input() grupoId: string;
  public dataAtributo: Atributo[] = [];
  public atributoList: Atributo[] = [];

  formGroup: FormGroup;
  constructor(
    protected injector: Injector,
    protected grupoAtributoService: GrupoAtributoService,
    public atributoService: AtributoService
  ) {
    super(injector, new GrupoAtributo(), grupoAtributoService, createFormGroup);
  }
  public ngOnInit(): void {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'GrupoAtributo').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.grupoId);
    this.view = this.resourceService.pipe(tap(res => console.log(res)));
    this.atributoService.getAll().subscribe(res => {
      console.log(res);
      this.atributoList = res.data;
      this.dataAtributo = res.data;
    });
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('GrupoId').setValue(this.grupoId);
    this.resource = GrupoAtributo.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = GrupoAtributo.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: Atributo): string {
    return this.atributoList.length !== 0 ? this.atributoList.find(item =>
       item.AtributoId === dataItem.AtributoId).AtributoDescricao : 'carregando';
  }

  handleAtributoFilter(value: string) {
    this.dataAtributo = this.atributoList.filter((item) => item.AtributoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public onSetorChange(e) {
    this.atributoList.filter(item => item.AtributoId === e);
  }

}

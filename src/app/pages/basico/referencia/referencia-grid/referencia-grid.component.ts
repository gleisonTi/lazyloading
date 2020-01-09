import { Component, OnInit, Injector } from '@angular/core';
import { Referencia } from '../shared/referencia.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReferenciaService } from '../shared/referencia.service';
import { GrupoService } from '../../grupo/shared/grupo.service';
import { Grupo } from '../../grupo/shared/grupo.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';


const createFormGroup = (dataItem?: Referencia) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaCodigo: new FormControl(dataItem.ReferenciaCodigo, Validators.required),
      ReferenciaDescricaoCompleta: new FormControl(dataItem.ReferenciaDescricaoCompleta, Validators.required),
      ReferenciaInativo: new FormControl(dataItem.ReferenciaInativo),
      GrupoId: new FormControl(dataItem.GrupoId , Validators.required),
      FabricanteId: new FormControl(dataItem.FabricanteId , Validators.required),
      UnidadeId: new FormControl(dataItem.UnidadeId, Validators.required),
      ColecaoId: new FormControl(dataItem.ColecaoId, Validators.required),
      ReferenciaIdMktPlace: new FormControl(dataItem.ReferenciaIdMktPlace),
      ReferenciaSequencia: new FormControl(dataItem.ReferenciaSequencia,[Validators.pattern(/^-?([0-9]\d*)?$/)]),
    }
    );
  } else {
    return new FormGroup({
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaCodigo: new FormControl('', Validators.required),
      ReferenciaDescricaoCompleta: new FormControl('', Validators.required),
      ReferenciaInativo: new FormControl(false),
      GrupoId: new FormControl('',Validators.required ),
      FabricanteId: new FormControl('',Validators.required ),
      UnidadeId: new FormControl('' , Validators.required),
      ColecaoId: new FormControl('', Validators.required),
      ReferenciaIdMktPlace: new FormControl(''),
      ReferenciaSequencia: new FormControl(0,[Validators.pattern(/^-?([0-9]\d*)?$/)]),
    });
  }
};

@Component({
  selector: 'incca-referencia-grid',
  templateUrl: './referencia-grid.component.html',
  styleUrls: ['./referencia-grid.component.scss']
})
export class ReferenciaGridComponent extends BaseResourceGridComponent<Referencia> implements OnInit {

  public createFormGroup: FormGroup;
  public openedCadReferencia = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: 'ReferenciaCodigo', title: 'Código' },
    { field: 'ReferenciaDescricaoCompleta', title: 'Referência' },
    { field: 'GrupoId', title: 'Grupo' },
    { field: 'ReferenciaInativo', title: 'Inativo' },
  ];

  public grupoList: Grupo[] = [];

  constructor(
    protected injector: Injector,
    public grupoService: GrupoService,
    public referenciaService: ReferenciaService,
  ) {
    super(injector, new Referencia(), referenciaService, createFormGroup);
  }

  ngOnInit() {
    super.ngOnInit();
    this.grupoService.getAll().subscribe(res => {this.grupoList = res.data; });
    this.view.subscribe(res => console.log(res));
  }

  public getName(dataItem: Grupo, col: string): string {
    if (col === 'GrupoId' ) {
        return this.grupoList.length !== 0 ? this.grupoList.find(item => item.GrupoId === dataItem.GrupoId).GrupoDescricao : 'carregando';
    }
  }

  public removeHandler({ dataItem }) {
    this.resource = Referencia.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public close() {
    this.openedCadReferencia = false;
  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadReferencia = true;
  }

  getFormGroupForm(formData: FormData) {
    this.close();
  }

  public getValueCheckBox(dataItem: Referencia, col: string): boolean {
    switch (col) {
      case "ReferenciaInativo": return dataItem.ReferenciaInativo;
      default: return false
    }
  }

}

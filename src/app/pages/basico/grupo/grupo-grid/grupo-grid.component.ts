import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Grupo } from '../shared/grupo.model';
import { GrupoService } from '../shared/grupo.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs/operators';

const createFormGroup = (dataItem?: Grupo) => {
  if (dataItem) {
    return new FormGroup({
      GrupoId: new FormControl(dataItem.GrupoId),
      GrupoIdPai: new FormControl(dataItem.GrupoIdPai),
      GrupoDescricao: new FormControl(dataItem.GrupoDescricao, Validators.required),
      GrupoPaiDescricao: new FormControl(dataItem.GrupoPaiDescricao),
      GrupoNCM: new FormControl(dataItem.GrupoNCM, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      GrupoPesoBruto: new FormControl(dataItem.GrupoPesoBruto, [Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoPesoLiquido: new FormControl(dataItem.GrupoPesoLiquido, [Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoSegmento: new FormControl(dataItem.GrupoSegmento, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSequencialProduto: new FormControl(dataItem.GrupoSequencialProduto, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSubClasse: new FormControl(dataItem.GrupoSubClasse, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoFamilia: new FormControl(dataItem.GrupoFamilia, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoCodigo: new FormControl(dataItem.GrupoCodigo, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoApareceConsumo: new FormControl(dataItem.GrupoApareceConsumo),
      GrupoClasse: new FormControl(dataItem.GrupoClasse, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
    }
    );
  } else {
    return new FormGroup({
      GrupoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoIdPai: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoDescricao: new FormControl('', Validators.required),
      GrupoPaiDescricao: new FormControl(''),
      GrupoNCM: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      GrupoPesoBruto: new FormControl(0.00, [Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoPesoLiquido: new FormControl(0.00, [Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoSegmento: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSequencialProduto: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSubClasse: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoFamilia: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoCodigo: new FormControl("", [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoApareceConsumo: new FormControl(false),
      GrupoClasse: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
    });
  }
};

@Component({
  selector: 'incca-grupo-grid',
  templateUrl: './grupo-grid.component.html',
  styleUrls: ['./grupo-grid.component.scss']
})
export class GrupoGridComponent extends BaseResourceGridComponent<Grupo> implements OnInit {

  public createFormGroup: FormGroup;
  public openedCadGrupo = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: 'GrupoCodigo', title: 'Código' },
    { field: 'GrupoDescricao', title: 'Grupo' },
    { field: 'GrupoSubGrupoNome', title: 'Sub Grupo' },
    { field: 'GrupoNCM', title: 'NCM' },
    { field: 'GrupoApareceConsumo', title: 'Aparece Consumo' },
  ];

  public grupoList: Grupo[] = [];

  constructor(
    protected injector: Injector,
    public grupoService: GrupoService,
    public popupMessage: ToastrService,
  ) {
    super(injector, new Grupo(), grupoService, createFormGroup);
  }

  ngOnInit() {
    super.ngOnInit();

  }

  public getName(dataItem: Grupo, col: string): string {
    if (col === 'GrupoId') {
      return this.grupoList.length !== 0 ? this.grupoList.find(item => item.GrupoId === dataItem.GrupoId).GrupoDescricao : 'carregando';
    }
  }

  public removeHandler({ dataItem }) {
    this.resource = Grupo.fromJson(dataItem);
    this.grupoService.removeGrupoAtributosVariacoes(this.resource.GrupoId)
      .pipe(tap(() => this.resourceService.read())) // recarrega o grid
      .subscribe(res => {
        res.Messages.forEach(item => {
          if (item.Id === "Success") {
            this.popupMessage.success(item.Description, item.Id)
          } else {
            this.popupMessage.error(item.Description, item.Id)
          }
        });
      });
  }

  public close() {
    this.openedCadGrupo = false;
  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadGrupo = true;
  }

  // getFormGroupForm(formData: FormData) {
  //   this.close();
  // }

  public getValueCheckBox(dataItem: Grupo, col: string): boolean {
    switch (col) {
      case "GrupoApareceConsumo": return dataItem.GrupoApareceConsumo;
      default: return false
    }
  }

}

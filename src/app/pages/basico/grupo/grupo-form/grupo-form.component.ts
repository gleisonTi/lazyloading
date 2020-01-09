import { Component, OnInit, Input, OnDestroy, DoCheck } from '@angular/core';
import { Grupo } from '../shared/grupo.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GrupoService } from '../shared/grupo.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'incca-grupo-form',
  templateUrl: './grupo-form.component.html',
  styleUrls: ['./grupo-form.component.scss']
})

export class GrupoFormComponent implements OnInit, OnDestroy, DoCheck {

  public inativo = false;
  public dataGrupo: Grupo[];
  public grupoList: Grupo[];
  public hasGrupoCod = false;
  public grupoId = '';
  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  public created = false;
  constructor(
    public grupoService: GrupoService,
    public loadingService: LoadingService,
  ) {
  }
  ngOnInit() {
    this.grupoService.getAll().subscribe(res => { this.grupoList = res.data; this.dataGrupo = res.data; });

    if(this.isNew){
      this.grupoService.getNewGrupoCodigo().subscribe(res => {
        this.formGroup.get('GrupoCodigo').setValue(res.Codigo);
      });
    }

  }

  get loading() {
    return this.loadingService.isLoading();
  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
  }

  ngDoCheck(): void {
    // para edição da referência
    if (this.formGroup.value.ReferenciaId !== '00000000-0000-0000-0000-000000000000') {
      this.grupoId = this.formGroup.value.GrupoId;
    }
  }

  salvarDados() {
    const grupo: Grupo = Grupo.fromJson(this.formGroup.value);
    this.grupoService.save(grupo, this.isNew).subscribe(res => {
      this.isNew = false
      this.grupoId = res.GrupoId;
      this.formGroup.get('GrupoId').setValue(res.GrupoId)
      this.created = true;
    });
  }

  handleFilterGrupo(e) {
    this.grupoList = this.dataGrupo.filter((item) =>
      item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  focusOutFunction(e) {
    if (this.isNew) {
      this.grupoService.checkCodProduto('grupo', e).subscribe(res => {
      this.hasGrupoCod = res.contains;
      });
    }
  }

}


const createFormGroup = (dataItem?: Grupo) => {
  if (dataItem) {
    return new FormGroup({
      GrupoId: new FormControl(dataItem.GrupoId),
      GrupoIdPai: new FormControl(dataItem.GrupoIdPai),
      GrupoDescricao: new FormControl(dataItem.GrupoDescricao, Validators.required),
      GrupoNCM: new FormControl(dataItem.GrupoNCM,[ Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      GrupoPesoBruto: new FormControl(dataItem.GrupoPesoBruto, [ Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoPesoLiquido: new FormControl(dataItem.GrupoPesoLiquido, [ Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoSegmento: new FormControl(dataItem.GrupoSegmento, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSequencialProduto: new FormControl(dataItem.GrupoSequencialProduto, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSubClasse: new FormControl(dataItem.GrupoSubClasse, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoFamilia: new FormControl(dataItem.GrupoFamilia,[Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoCodigo: new FormControl(dataItem.GrupoCodigo, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoApareceConsumo: new FormControl(dataItem.GrupoApareceConsumo),
      GrupoClasse: new FormControl(dataItem.GrupoClasse,[Validators.pattern(/^-?([0-9]\d*)?$/)]),
    }
    );
  } else {
    return new FormGroup({
      GrupoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoIdPai: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoDescricao: new FormControl('', Validators.required),
      GrupoNCM: new FormControl('',[ Validators.required, Validators.maxLength(8), Validators.minLength(8)]),
      GrupoPesoBruto: new FormControl('', [ Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoPesoLiquido: new FormControl('', [ Validators.pattern(/^[\d,.?!]+$/)]),
      GrupoSegmento: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSequencialProduto: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoSubClasse: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoFamilia: new FormControl('',[Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoCodigo: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      GrupoApareceConsumo: new FormControl(''),
      GrupoClasse: new FormControl('',[Validators.pattern(/^-?([0-9]\d*)?$/)]),
    });
  }
};

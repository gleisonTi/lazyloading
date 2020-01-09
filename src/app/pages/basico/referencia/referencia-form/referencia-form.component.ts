import { Component, OnInit, OnDestroy, Input, OnChanges, DoCheck } from '@angular/core';
import { Referencia } from '../shared/referencia.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GradeService } from '../../grade/shared/grade.service';
import { ReferenciaService } from '../shared/referencia.service';
import { GrupoService } from '../../grupo/shared/grupo.service';
import { UnidadeService } from '../../unidade/shared/unidade.service';
import { EmbalagemService } from 'src/app/pages/basico/embalagem/shared/embalagem.service';
import { Unidade } from '../../unidade/shared/unidade.model';
import { Grupo } from '../../grupo/shared/grupo.model';
import { Fabricante } from '../../fabricante/shared/fabricante.model';
import { Colecao } from '../../colecao/shared/colecao.model';
import { FabricanteService } from '../../fabricante/shared/fabricante.service';
import { ColecaoService } from '../../colecao/shared/colecao.service';
import { GrupoVariacaoService } from '../../grupo-variacao/shared/grupo-variacao.service';
import { GrupoAtributoService } from '../../grupo-atributo/shared/grupo-atributo.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'incca-referencia-form',
  templateUrl: './referencia-form.component.html',
  styleUrls: ['./referencia-form.component.scss']
})
export class ReferenciaFormComponent implements OnInit, OnDestroy, DoCheck {

  public inativo = false;
  public fabricanteList: Fabricante[];
  public grupoList: Grupo[];
  public unidadeList: Unidade[];
  public referenciaList: Referencia[];
  public colecaoList: Colecao[];
  public dataFabricante: Fabricante[];
  public dataGrupo: Grupo[];
  public dataUnidade: Unidade[];
  public dataReferencia: Referencia[];
  public dataColecao: Colecao[];
  public grupoVariacaoIsEmpy: boolean = false;
  public grupoAtributoIsEmpy: boolean = false;
  public hasReferenciaCod = false;
  public referenciaId = '';
  public grupoId = '';
  public fabricanteId = '';
  public colecaoId = '';
  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  public created = false;
  constructor(
    public fabricanteService: FabricanteService,
    public grupoVariacaoService: GrupoVariacaoService,
    public loadingService: LoadingService,
    public grupoAtributoService: GrupoAtributoService,
    public referenciaService: ReferenciaService,
    public grupoService: GrupoService,
    public unidadeService: UnidadeService,
    public colecaoService: ColecaoService,
  ) {
  }
  ngOnInit() {
    this.fabricanteService.getAll().subscribe(res => { this.fabricanteList = res.data; this.dataFabricante = res.data; });
    this.referenciaService.getAll().subscribe(res => { this.referenciaList = res.data; this.dataReferencia = res.data; });
    this.grupoService.getAll().subscribe(res => { this.grupoList = res.data; this.dataGrupo = res.data; });
    this.unidadeService.getAll().subscribe(res => { this.unidadeList = res.data; this.dataUnidade = res.data; });
    this.colecaoService.getAll().subscribe(res => { this.colecaoList = res.data; this.dataColecao = res.data; });
    // this.grupoVariacaoService.getAll(undefined, this.grupoId).subscribe(res => {
    // });
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
      this.referenciaId = this.formGroup.value.ReferenciaId;
      this.grupoId = this.formGroup.value.GrupoId;
      this.fabricanteId = this.formGroup.value.FabricanteId;
      this.colecaoId = this.formGroup.value.ColecaoId;
    }
  }


  changeGrupo(e) {
    // mostrar mensagem quando não houver referencia.
    if (e !== '') {
      this.grupoVariacaoService.getAll(undefined, e).subscribe(res => {
        if (res.total > 0) {
          this.grupoVariacaoIsEmpy = false;
        } else {
          this.grupoVariacaoIsEmpy = true;
        }
      });

      this.grupoAtributoService.getAll(undefined, e).subscribe(res => {
        if (res.total > 0) {
          this.grupoAtributoIsEmpy = false;
        } else {
          this.grupoAtributoIsEmpy = true;
        }
      });
    }

  }

  salvarDados() {
    const referencia: Referencia = Referencia.fromJson(this.formGroup.value);
    this.referenciaService.save(referencia, this.isNew).subscribe(res => {
      this.isNew = false
      this.referenciaId = res.ReferenciaId;
      this.formGroup.get('ReferenciaId').setValue(res.ReferenciaId)
      this.grupoId = res.GrupoId;
      this.fabricanteId = res.FabricanteId;
      this.colecaoId = res.ColecaoId;
      this.created = true;
    });
  }

  focusOutFunction(e) {
    if (this.isNew) {
      this.referenciaService.checkCodProduto('referencia', e).subscribe(res => {
        this.hasReferenciaCod = res.contains;

      });
    }
  }

  // filtros de pesquisa
  handleFilterUnidade(e) {
    this.unidadeList = this.dataUnidade.filter((item) =>
      item.UnidadeDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  handleFilterFabricante(e) {
    this.fabricanteList = this.dataFabricante.filter((item) =>
      item.FabricanteDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }
  handleFilterGrupo(e) {
    this.grupoList = this.dataGrupo.filter((item) =>
      item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }
  handleFilterColecao(e) {
    this.colecaoList = this.dataColecao.filter((item) =>
      item.ColecaoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

}
// fora da classe
const createFormGroup = (dataItem?: Referencia) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaCodigo: new FormControl(dataItem.ReferenciaCodigo, Validators.required),
      ReferenciaDescricaoCompleta: new FormControl(dataItem.ReferenciaDescricaoCompleta, Validators.required),
      ReferenciaInativo: new FormControl(dataItem.ReferenciaInativo),
      GrupoId: new FormControl(dataItem.GrupoId),
      FabricanteId: new FormControl(dataItem.FabricanteId),
      UnidadeId: new FormControl(dataItem.UnidadeId),
      ColecaoId: new FormControl(dataItem.ColecaoId),
      ReferenciaIdMktPlace: new FormControl(dataItem.ReferenciaIdMktPlace),
      ReferenciaSequencia: new FormControl(dataItem.ReferenciaSequencia, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
    }
    );
  } else {
    return new FormGroup({
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaCodigo: new FormControl('', Validators.required),
      ReferenciaDescricaoCompleta: new FormControl('', Validators.required),
      ReferenciaInativo: new FormControl(false),
      GrupoId: new FormControl(''),
      FabricanteId: new FormControl(''),
      UnidadeId: new FormControl(''),
      ColecaoId: new FormControl(''),
      ReferenciaIdMktPlace: new FormControl(''),
      ReferenciaSequencia: new FormControl(0, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
    });
  }
};

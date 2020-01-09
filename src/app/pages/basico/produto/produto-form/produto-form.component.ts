import { Produto } from './../shared/produto.model';
import { Atributo } from "./../../atributo/shared/atributo.model";
import { Fabricante } from "./../../fabricante/shared/fabricante.model";
import { FabricanteService } from "./../../fabricante/shared/fabricante.service";
import { ParametroService } from "./../../parametro/shared/parametro.service";
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  OnDestroy
} from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { GrupoService } from "../../grupo/shared/grupo.service";
import { UnidadeService } from "../../unidade/shared/unidade.service";
import { Grupo } from "../../grupo/shared/grupo.model";
import { Unidade } from "../../unidade/shared/unidade.model";
import { ReferenciaService } from "../../referencia/shared/referencia.service";
import { EmbalagemService } from "src/app/pages/basico/embalagem/shared/embalagem.service";
import { ProdutoService } from "../shared/produto.service";
import { Referencia } from "../../referencia/shared/referencia.model";
import { Embalagem } from "src/app/pages/basico/embalagem/shared/embalagem.model";
import { VariacaoService } from "../../variacao/shared/variacao.service";
import { LoadingService } from "src/app/shared/services/loading.service";
import { ProdutoAtributo } from "../../produto-atributo/shared/produto-atributo.model";
import { ToastrService } from 'ngx-toastr';
import { ProdutoAtributoService } from '../../produto-atributo/shared/produto-atributo.service';
@Component({
  selector: "incca-produto-form",
  templateUrl: "./produto-form.component.html",
  styleUrls: ["./produto-form.component.scss"],
  providers: [VariacaoService]
})
export class ProdutoFormComponent implements OnInit, OnDestroy {
  public maskPercent = "99%";
  public inativo = false;
  public fabricanteList: Fabricante[];
  public grupoList: Grupo[];
  public unidadeList: Unidade[];
  public referenciaList: Referencia[];
  public embalagemList: Embalagem[];
  public dataFabricante: Fabricante[];
  public dataGrupo: Grupo[];
  public dataUnidade: Unidade[];
  public dataReferencia: Referencia[];
  public dataEmbalagem: Embalagem[];
  public atributos: Array<Atributo>;
  public produtoAtributoList: Array<ProdutoAtributo> = [];
  public produtoAtributoForUpdateList: Array<ProdutoAtributo> = [];

  public spedList: Array<{ value: number; descricao: string }> = [
    { value: 0, descricao: "00 – Mercadoria para Revenda" },
    { value: 1, descricao: "01 – Matéria-prima" },
    { value: 2, descricao: "02 – Embalagem" },
    { value: 3, descricao: "03 – Produto em Processo" },
    { value: 4, descricao: "04 – Produto Acabado" },
    { value: 5, descricao: "05 – Subproduto" },
    { value: 6, descricao: "06 – Produto Intermediário" },
    { value: 7, descricao: "07 – Material de Uso e Consumo" },
    { value: 8, descricao: "08 – Ativo Imobilizado" },
    { value: 9, descricao: "09 – Serviços" },
    { value: 10, descricao: "10 – Outros insumos" },
    { value: 99, descricao: "99 – Outras" }
  ];

  public hasProdutoCod = false;

  public produtoId = "";
  public possuiReferencia: boolean = false;
  public gradeId = "";
  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  @Output() public sendFormGroup = new EventEmitter<FormGroup>();
  public created: boolean = false;

  constructor(
    public fabricanteService: FabricanteService,
    public referenciaService: ReferenciaService,
    public grupoService: GrupoService,
    public unidadeService: UnidadeService,
    public popupMessage: ToastrService,
    public parametroService: ParametroService,
    public embalagemaService: EmbalagemService,
    public loadingService: LoadingService,
    public produtoAtributoService: ProdutoAtributoService,
    public produtoService: ProdutoService
  ) { }
  get loading() {
    return this.loadingService.isLoading();
  }

  ngOnInit() {
    // busca se sistema Possui referencia
    this.parametroService.getById("5EB7554B-BF63-40C7-9C24-E05A9BD60D0C").subscribe(res => {
      if (res.ParametroValor === "true") {
        this.possuiReferencia = true;
      }
    });

    if (!this.isNew) {
      this.produtoId = this.formGroup.value.ProdutoId;
      this.gradeId = this.formGroup.value.GradeId;
      this.valueChangeGrupo(this.formGroup.value.GrupoId);

    } else {
      this.produtoService.getNewCodigoProduto().subscribe(res => {
        this.formGroup.get("ProdutoCodigo").setValue(res.Codigo);
      });
    }
    this.fabricanteService.getAll().subscribe(res => {
      this.fabricanteList = res.data;
      this.dataFabricante = res.data;
      if (this.isNew && this.fabricanteList.length) {
        this.formGroup.get('ProdutoFabricanteId').setValue(this.fabricanteList[0].FabricanteId);
      }
    });
    this.referenciaService.getAll().subscribe(res => {
      this.referenciaList = res.data;
      this.dataReferencia = res.data;
    });
    this.grupoService.getAll().subscribe(res => {
      this.grupoList = res.data;
      this.dataGrupo = res.data;
    });
    this.unidadeService.getAll().subscribe(res => {
      this.unidadeList = res.data;
      this.dataUnidade = res.data;
    });
    this.embalagemaService.getAll().subscribe(res => {
      this.embalagemList = res.data;
      this.dataEmbalagem = res.data;
    });
  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
  }

  buscaAtributoValues() {
    // atribui valores nos campos dos atributos cadastrados;
    this.produtoAtributoService.getProdutoAtributo(null, this.produtoId).subscribe(res => {
      if (res) {
        res.forEach((item, index) => {
          let produtoAtributo = this.atributos.find(i => i.AtributoId === item.AtributoId);
          index = this.atributos.indexOf(produtoAtributo);
          if (index !== -1) {
            this.formGroup.get("Atributo" + index).setValue(item.ProdutoAtributoValue);
          }
        });
        this.produtoAtributoForUpdateList = res;
      }
    });
  }

  salvarDados() {
    // this.sendFormGroup.emit(this.formGroup)

    this.setValueAtributos(); // associa valores dos atributos ao seu Id
    const produto: Produto = Produto.fromJson(this.formGroup.value);
    produto.ProdutoAtributos = this.produtoAtributoList;
    console.log(produto);

    this.produtoService.setProdutoAndProdutoAtributos(produto, this.isNew).subscribe(res => {
      res.messages.forEach(item => {
        if (item.Id === 'Success') {
          this.popupMessage.success(item.Description, item.Id);
        } else {
          this.popupMessage.error(item.Description, item.Id);
        }
      });
      this.isNew = false
      this.created = true;
      this.formGroup.get('ProdutoId').setValue(res.responseProdutoSDT.ProdutoId); // para atualizar
      this.produtoId = res.responseProdutoSDT.ProdutoId;
      this.gradeId = res.responseProdutoSDT.GradeId;
    });

  }

  focusOutFunction(e) {
    if (this.isNew) {
      this.produtoService.checkCodProduto("produto", e).subscribe(res => {
        this.hasProdutoCod = res.contains;
      });
    }
  }
  // filtros de pesquisa
  handleFilterReferencia(e) {
    this.referenciaList = this.dataReferencia.filter(
      item =>
        item.ReferenciaDescricaoCompleta.toLowerCase().indexOf(
          e.toLowerCase()
        ) !== -1
    );
  }
  handleFilterUnidade(e) {
    this.unidadeList = this.dataUnidade.filter(
      item =>
        item.UnidadeDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1
    );
  }

  handleFilterFabricante(e) {

    this.fabricanteList = this.dataFabricante.filter(
      item =>
        item.FabricanteDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1
    );
  }

  handleFilterGrupo(e) {
    this.grupoList = this.dataGrupo.filter(
      item => item.GrupoDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1
    );
  }
  handleFilterEmbalagem(e) {
    this.embalagemList = this.dataEmbalagem.filter(
      item =>
        item.EmbalagemDescricao.toLowerCase().indexOf(e.toLowerCase()) !== -1
    );
  }
  // busca atributos a partir o grupo selecionado
  valueChangeGrupo(e) {
    if (e) {
      this.grupoService.getAtributosbyGrupoId(e).subscribe(res => {
        // criar control para enviar dados para procedure
        if (res) {
          if (res.Atributos) {
            res.Atributos.forEach((atributo, index) => {
              this.formGroup.addControl(
                "Atributo" + index,
                new FormControl("", Validators.required)
              );
            });
            this.atributos = res.Atributos;
            // verifica se é uma edição para popular os valores dos atributos
            if (this.isNew === false) {
              this.buscaAtributoValues();
            }
          }
        }
      });

      // busca valores padroes do grupo Ex
      this.grupoService.getById(e).subscribe(res => {
        if (res) {
          this.formGroup.get('ProdutoFisNcm').setValue(res.GrupoNCM);
          this.formGroup.get('ProdutoFisPesoBruto').setValue(res.GrupoPesoBruto);
          this.formGroup.get('ProdutoFisPesoLiquido').setValue(res.GrupoPesoLiquido);
        }
      });
    }
  }
  //função para retornar ProdutoAtributoId para Lista de atributos
  buscarProdutoAtributId(atributo: Atributo) {
    if (this.isNew) {
      // se é um novo cadastro todos os produtosAtributos são novos
      return '00000000-0000-0000-0000-000000000000';
    } else {
      const prodAtt = this.produtoAtributoForUpdateList.
        find(item => item.ProdutoId === this.produtoId && item.AtributoId === atributo.AtributoId);
      if (prodAtt) {
        // se ProdutoAtributo já existe retorna seu id para ser atualizado no back end.
        return prodAtt.ProdutoAtributoId
      } else {
        // se não retorna guid vazia para incluir novo ProdutoAtributo.
        console.log("ha atributos novos para incluir")
        return '00000000-0000-0000-0000-000000000000';
      }
    }
  }

  setValueAtributos() {

    if (this.isNew) {
      this.produtoAtributoList = [];
    } else {
      //
    }
    // salva valor do atributo
    this.atributos.forEach((atributo, index) => {

      this.produtoAtributoList.push({
        //  busca id do produtoAtributo para ser atualizado se for edição e guid vazio se for novo
        ProdutoAtributoId: this.buscarProdutoAtributId(atributo),
        AtributoId: atributo.AtributoId,
        ProdutoAtributoValue: this.formGroup.get("Atributo" + index).value
      });
    });
  }
}

const createFormGroup = (dataItem?: Produto) => {
  if (dataItem) {
    return new FormGroup({
      ProdutoId: new FormControl(dataItem.ProdutoId),
      ProdutoDescricao: new FormControl(dataItem.ProdutoDescricao, Validators.required),
      UnidadeId: new FormControl(dataItem.UnidadeId, Validators.required),
      ProdutoDescricaoComplementar: new FormControl(dataItem.ProdutoDescricaoComplementar),
      GradeId: new FormControl(dataItem.GradeId, Validators.required),
      ProdutoInativo: new FormControl(dataItem.ProdutoInativo),
      GrupoId: new FormControl(dataItem.GrupoId, Validators.required),
      ProdutoEmbalagemId: new FormControl(dataItem.ProdutoEmbalagemId),
      ProdutoKit: new FormControl(dataItem.ProdutoKit),
      ProdutoGerouCnp: new FormControl(dataItem.ProdutoGerouCnp),
      ProdutoReferenciaId: new FormControl(dataItem.ProdutoReferenciaId, Validators.required),
      ProdutoFisFci: new FormControl(dataItem.ProdutoFisFci, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisNcm: new FormControl(dataItem.ProdutoFisNcm, [Validators.required, Validators.maxLength(8), Validators.minLength(8),
      Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisPesoBruto: new FormControl(dataItem.ProdutoFisPesoBruto, [, Validators.pattern(/^\d+((\.|\,)\d{3})?$/)]),
      ProdutoFisPesoLiquido: new FormControl(dataItem.ProdutoFisPesoLiquido, Validators.pattern(/^\d+((\.|\,)\d{3})?$/)),
      ProdutoFisPercentualConteudoImportado: new FormControl(dataItem.ProdutoFisPercentualConteudoImportado),
      ProdutoCodigo: new FormControl(dataItem.ProdutoCodigo),
      ProdutoFisTipoProduto: new FormControl(dataItem.ProdutoFisTipoProduto)
    });
  } else {
    return new FormGroup({
      ProdutoId: new FormControl("00000000-0000-0000-0000-000000000000"), // passar guid
      ProdutoDescricao: new FormControl("", Validators.required),
      UnidadeId: new FormControl("Un", Validators.required),
      ProdutoDescricaoComplementar: new FormControl(""),
      GradeId: new FormControl("00000000-0000-0000-0000-000000000000", Validators.required), //D57E3AA5-CFCA-472E-973A-81DBB09C56E3
      ProdutoInativo: new FormControl(false),
      GrupoId: new FormControl("", Validators.required),
      ProdutoEmbalagemId: new FormControl(""),
      ProdutoKit: new FormControl(false),
      ProdutoGerouCnp: new FormControl(false),
      ProdutoReferenciaId: new FormControl("", Validators.required),
      ProdutoFisFci: new FormControl("", [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisNcm: new FormControl("", [Validators.required, Validators.maxLength(8),
      Validators.minLength(8), Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisPesoBruto: new FormControl("", [Validators.required, Validators.pattern(/^\d+((\.|\,)\d{3})?$/)]),
      ProdutoFisPesoLiquido: new FormControl("", Validators.pattern(/^\d+((\.|\,)\d{3})?$/)),
      ProdutoFisPercentualConteudoImportado: new FormControl(""),
      ProdutoCodigo: new FormControl("", Validators.required),
      ProdutoFisTipoProduto: new FormControl(0)
    });
  }
};

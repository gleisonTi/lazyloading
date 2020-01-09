import { Produto } from './../shared/produto.model';
import { Component, OnInit, Injector } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BaseResourceGridComponent } from "src/app/shared/components/base-resource-grid/base-resource-grid.component";
import { Colecao } from "../../colecao/shared/colecao.model";
import { ProdutoService } from "../shared/produto.service";
import { WorkbookSheetRowCellBorderBottom } from "@progress/kendo-ooxml";
import { Referencia } from "../../referencia/shared/referencia.model";
import { Grupo } from "../../grupo/shared/grupo.model";
import { GradeService } from "../../grade/shared/grade.service";
import { ReferenciaService } from "../../referencia/shared/referencia.service";
import { GrupoService } from "../../grupo/shared/grupo.service";
import { ToastrService } from 'ngx-toastr';
export const createFormGroup = (dataItem?: Produto) => {
  if (dataItem) {
    return new FormGroup({
      ProdutoId: new FormControl(dataItem.ProdutoId),
      ProdutoDescricao: new FormControl(dataItem.ProdutoDescricao, Validators.required),
      UnidadeId: new FormControl(dataItem.UnidadeId, Validators.required),
      ProdutoDescricaoComplementar: new FormControl(dataItem.ProdutoDescricaoComplementar),
      GradeId: new FormControl(dataItem.GradeId, Validators.required),
      ProdutoInativo: new FormControl(dataItem.ProdutoInativo),
      ProdutoPossuiConsumo: new FormControl(dataItem.ProdutoPossuiConsumo),
      GrupoId: new FormControl(dataItem.GrupoId, Validators.required),
      ProdutoEmbalagemId: new FormControl(dataItem.ProdutoEmbalagemId, Validators.required),
      ProdutoFabricanteId: new FormControl(dataItem.ProdutoFabricanteId, Validators.required),
      ProdutoKit: new FormControl(dataItem.ProdutoKit),
      ProdutoGerouCnp: new FormControl(dataItem.ProdutoGerouCnp),
      ProdutoReferenciaId: new FormControl(dataItem.ProdutoReferenciaId),
      ProdutoFisFci: new FormControl(dataItem.ProdutoFisFci, [Validators.pattern(/^-?([0-9]\d*)?$/)]), ProdutoFisNcm: new FormControl(dataItem.ProdutoFisNcm, [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisPesoBruto: new FormControl(parseFloat(dataItem.ProdutoFisPesoBruto).toFixed(2), [, Validators.pattern(/^[\d,.?!]+$/)]),
      ProdutoFisPesoLiquido: new FormControl(parseFloat(dataItem.ProdutoFisPesoLiquido), Validators.pattern(/^[\d,.?!]+$/)),
      ProdutoFisPercentualConteudoImportado: new FormControl(dataItem.ProdutoFisPercentualConteudoImportado, Validators.pattern(/^[\d,.?!]+$/)),
      ProdutoCodigo: new FormControl(dataItem.ProdutoCodigo),
      ProdutoFisTipoProduto: new FormControl(dataItem.ProdutoFisTipoProduto)
    });
  } else {
    return new FormGroup({
      ProdutoId: new FormControl("00000000-0000-0000-0000-000000000000"), // passar guid
      ProdutoDescricao: new FormControl("", Validators.required),
      UnidadeId: new FormControl("Un", Validators.required),
      ProdutoDescricaoComplementar: new FormControl(""),
      GradeId: new FormControl("00000000-0000-0000-0000-000000000000", Validators.required), // em autopeça não e obrigatorio
      ProdutoInativo: new FormControl(false),
      GrupoId: new FormControl("", Validators.required),
      ProdutoEmbalagemId: new FormControl("", Validators.required),
      ProdutoFabricanteId: new FormControl("00000000-0000-0000-0000-000000000000", Validators.required), // fabricante padrão
      ProdutoKit: new FormControl(false),
      ProdutoPossuiConsumo: new FormControl(false),
      ProdutoGerouCnp: new FormControl(false),
      ProdutoReferenciaId: new FormControl("00000000-0000-0000-0000-000000000000"), // em autopeça não e obrigatorio
      ProdutoFisFci: new FormControl("", [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisNcm: new FormControl("", [Validators.required, Validators.maxLength(8), Validators.minLength(8), Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ProdutoFisPesoBruto: new FormControl("", [Validators.pattern(/^[\d,.?!]+$/)]),
      ProdutoFisPesoLiquido: new FormControl("", Validators.pattern(/^[\d,.?!]+$/)),
      ProdutoFisPercentualConteudoImportado: new FormControl("", Validators.pattern(/^[\d,.?!]+$/)),
      ProdutoCodigo: new FormControl("", Validators.required),
      ProdutoFisTipoProduto: new FormControl(0)
    });
  }
};
@Component({
  selector: "incca-produto-grid",
  templateUrl: "./produto-grid.component.html",
  styleUrls: ["./produto-grid.component.scss"]
})
export class ProdutoGridComponent extends BaseResourceGridComponent<Colecao>
  implements OnInit {
  public createFormGroup: FormGroup;
  public openedCadProduto = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: "ProdutoCodigo", title: "Produto Código" },
    // { field: 'ProdutoReferenciaNome', title: 'Referência' },
    { field: "ProdutoDescricao", title: "Descrição" },
    { field: "GrupoDescricao", title: "Grupo" },
    { field: "UnidadeId", title: "Unidade" }
  ];
  public referenciaList: Referencia[] = [];
  public grupoList: Grupo[] = [];

  constructor(
    protected injector: Injector,
    protected produtoService: ProdutoService,
    public grupoService: GrupoService,
    public popupMessage: ToastrService,
    public referenciaService: ReferenciaService
  ) {
    super(injector, new Produto(), produtoService, createFormGroup);
  }

  ngOnInit() {
    super.ngOnInit();
    this.referenciaService.getAll().subscribe(res => {
      this.referenciaList = res.data;
    });
    this.grupoService.getAll().subscribe(res => {
      this.grupoList = res.data;
    });

    this.view.subscribe(res => {
      console.log(res);
    });
  }

  public getName(dataItem: Produto, col: string): string {
    switch (col) {
      case "ProdutoReferenciaId":
        return this.referenciaList.length !== 0
          ? this.referenciaList.find(
            item => item.ReferenciaId === dataItem.ProdutoReferenciaId
          ).ReferenciaDescricaoCompleta
          : "carregando";
      case "GrupoId":
        return this.grupoList.length !== 0
          ? this.grupoList.find(item => item.GrupoId === dataItem.GrupoId)
            .GrupoDescricao
          : "carregando";
      default:
        break;
    }
  }

  public removeHandler({ dataItem }) {

    this.produtoService.removeProdutoAndProdutoAtributos(dataItem.ProdutoId).subscribe(res => {
      res.messages.forEach(item => {
        if (item.Id === 'Success') {
          this.popupMessage.success(item.Description, item.Id);
        } else {
          this.popupMessage.error(item.Description, item.Id);
        }
      });
    });

    // this.resource = Produto.fromJson(dataItem);
    // this.resourceService.remove(this.resource);
  }

  public close() {
    this.openedCadProduto = false;
  }

  public opem({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de produto
    this.openedCadProduto = true;
    // this.router.navigate([{ outlets: { cadFor: ['formularioCadastro'] } }], { relativeTo: this.route });
  }

  getFormGroupForm(formData: FormData) {
    this.close();
  }

  public getList(col) {
    if (col === "ProdutoReferenciaId") {
      return this.referenciaList;
    } else {
      return this.grupoList;
    }
  }
}

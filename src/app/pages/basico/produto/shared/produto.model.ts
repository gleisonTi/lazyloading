import { BaseResourceModel } from '../../../../shared/models/base-resource.model';
import { ProdutoAtributo } from '../../produto-atributo/shared/produto-atributo.model';

export class Produto extends BaseResourceModel {
  constructor(
    public ProdutoId?: string,
    public ProdutoDescricao?: string,
    public UnidadeId?: string,
    public ProdutoDescricaoComplementar?: string,
    public GradeId?: string,
    public ProdutoInativo?: boolean,
    public ProdutoPossuiConsumo?: boolean,
    public GrupoId?: string,
    public GrupoDescricao?: string,
    public ProdutoUsuarioCadastro?: string,
    public ProdutoDataCadastro?: string,
    public ProdutoUsuarioAlteracao?: string,
    public ProdutoDataAlteracao?: string,
    public ProdutoEmbalagemId?: string,
    public ProdutoFabricanteId?: string,
    public ProdutoKit?: boolean,
    public ProdutoGerouCnp?: boolean,
    public ProdutoReferenciaId?: string,
    public ProdutoReferenciaNome?: string,
    public ProdutoFisPesoLiquido?: string,
    public ProdutoFisPesoBruto?: string,
    public ProdutoFisFci?: string,
    public ProdutoEmpresaId?: string,
    public ProdutoFisNcm?: string,
    public ProdutoFisTipoProduto?: number,
    public ProdutoFisPercentualConteudoImportado?: string,
    public ProdutoCodigo?: string,
    public ProdutoAtributos?: Array<ProdutoAtributo>
  ) {
    super();
    this.id  = this.ProdutoId
  }

  static fromJson(jsonData: any): Produto {
    return Object.assign(new Produto(jsonData.ProdutoId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoConsumo extends BaseResourceModel {
  constructor(
    public ProdutoConsumoId?: string,
    public ProdutoConsumoProdutoId?: string,
    public ComponenteId?: string,
    public ComponenteDescricao?: string,
    public ProdutoId?: string,
    public ProdutoDescricao?: string,
    public UnidadeId?: string,
    public ProdutoConsumoUsuario?: string,
    public ProdutoConsumoData?: string,
    public ProdutoConsumoHora?: string,
    public ProdutoConsumoQuantidade?: string,
    public SetorId?: string,
    public SetorDescricao?: string,
    public SetorCodigo?: number

  ) {
    super();
    this.id = this.ProdutoConsumoId
    this.ProdutoConsumoProdutoId = this.ProdutoConsumoId
  }

  static fromJson(jsonData: any): ProdutoConsumo {
    return Object.assign(new ProdutoConsumo(jsonData.ProdutoConsumoId), jsonData);
  }
}

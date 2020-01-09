import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoEstoque extends BaseResourceModel {
  constructor(
    public ProdutoEstoqueId?: string,
    public ProdutoId?: string,
    public TamanhoId?: string,
    public Tamanho?: string, // descrição do tamanho
    public TipoEstoqueId?: string,
    public TipoEstoqueDescricao?: string,
    public ProdutoEstoqueQuantidade?: string,
    public ProdutoEstoqueArmazenamento?: string
  ) {
    super();
    this.id = this.ProdutoEstoqueId
  }

  static fromJson(jsonData: any): ProdutoEstoque {
    return Object.assign(new ProdutoEstoque(jsonData.ProdutoEstoqueId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class TabelaPrecoProduto extends BaseResourceModel {
  constructor(
    public TabelaPrecoProdutoId?: string,
    public TabelaPrecoId?: string,
    public TabelaPrecoDescricao?: string,
    public ProdutoId?: string,
    public ProdutoDescricao?: string,
    public TabelaPrecoProdutoValor?: string,
    public TabelaPrecoProdutoComissao?: number,
  ) {
    super();
    this.id = this.TabelaPrecoProdutoId
  }
  static fromJson(jsonData: any): TabelaPrecoProduto {
    return Object.assign(new TabelaPrecoProduto(jsonData.TabelaPrecoProdutoId), jsonData);
  }
}

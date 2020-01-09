import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoComposicao extends BaseResourceModel {
  constructor(
    public ProdutoComposicaoId?: string,
    public ProdutoId?: string,
    public VariacaoId?: string,
    public ProdutoComposicaoUsuario?: string,
    public ProdutoComposicaoData?: string,
  ) {
    super();
    this.id = this.ProdutoComposicaoId;
  }

  static fromJson(jsonData: any): ProdutoComposicao {
    return Object.assign(new ProdutoComposicao(jsonData.ProdutoComposicaoId), jsonData);
  }
}

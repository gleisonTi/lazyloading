import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoAtributo extends BaseResourceModel {
  constructor(
    public ProdutoAtributoId?: string,
    public ProdutoId?: string,
    public AtributoId?: string,
    public ProdutoAtributoValue?: string,
  ) {
    super();
    this.id = this.ProdutoAtributoId;
  }

  static fromJson(jsonData: any): ProdutoAtributo {
    return Object.assign(new ProdutoAtributo(jsonData.ProdutoComposicaoId), jsonData);
  }
}

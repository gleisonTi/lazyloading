import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoSku extends BaseResourceModel {
  constructor(
    public ProdutoSKUId?: string,
    public ProdutoId?: string,
    public ProdutoSKUTamanhoId?: string,
    public ProdutoSKUCodigo?: string
  ) {
    super();
    this.id =  this.ProdutoSKUId
  }

  static fromJson(jsonData: any): ProdutoSku {
    return Object.assign(new ProdutoSku(jsonData.ProdutoSKUId), jsonData);
  }
}

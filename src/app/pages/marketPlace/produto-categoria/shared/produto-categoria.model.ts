import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoCategoria extends BaseResourceModel {
  constructor(
    public ProdutoCategoriaId?: string,
    public ProdutoId?: string,
    public CategoriaId?: string,
  ) {
    super();
    this.id = this.ProdutoCategoriaId
  }
  static fromJson(jsonData: any): ProdutoCategoria {
    return Object.assign(new ProdutoCategoria(jsonData.ProdutoCategoriaId), jsonData);
  }
}

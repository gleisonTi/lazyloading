import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ProdutoImagem extends BaseResourceModel {
  constructor(
    public ProdutoImagemId?: string,
    public ProdutoId?: string,
    public ProdutoImagemOrdem?: number,
    public ProdutoImagemFoto?: string,
    public ProdutoImagemUsuario?: string,
    public ProdutoImagemData?: string,

  ) {
    super();
    this.id = this.ProdutoImagemId
  }

  static fromJson(jsonData: any): ProdutoImagem {
    return Object.assign(new ProdutoImagem(jsonData.ProdutoImagemId), jsonData);
  }
}

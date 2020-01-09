import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class VariacaoImagem extends BaseResourceModel {
  constructor(
    public VariacaoImagemId?: string,
    public VariacaoId?: string,
    public VariacaoImagemOrdem?: number,
    public VariacaoImagemFoto?: string,
    public VariacaoImagemUsuario?: string,
    public VariacaoImagemData?: string,
    public VariacaoImagemHora?: string

  ) {
    super();
    this.id = this.VariacaoImagemId
  }

  static fromJson(jsonData: any): VariacaoImagem {
    return Object.assign(new VariacaoImagem(jsonData.VariacaoImagemId), jsonData);
  }
}

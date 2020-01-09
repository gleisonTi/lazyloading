import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class GrupoVariacao extends BaseResourceModel {
  constructor(
    public GrupoVariacaoId?: string,
    public GrupoId?: string,
    public VariacaoId?: string,
    public GrupoVariacaoUsuario?: string,
    public GrupoVariacaoData?: string,
    public GrupoVariacaoHora?: string
  ) {
    super();
    this.id = this.GrupoVariacaoId;
  }

  static fromJson(jsonData: any): GrupoVariacao {
    return Object.assign(new GrupoVariacao(jsonData.GrupoVariacaoId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class TipoCobranca extends BaseResourceModel {
  constructor(
    public TipoCobrancaId?: string,
    public TipoCobrancaDescricao?: string,
    public TipoCobrancaUsuario?: string,
    public TipoCobrancaData?: string,
    public TipoCobrancaHora?: string

  ) {
    super();
    this.id = this.TipoCobrancaId;
  }

  static fromJson(jsonData: any): TipoCobranca {
    return Object.assign(new TipoCobranca(jsonData.TipoCobrancaId), jsonData);
  }
}

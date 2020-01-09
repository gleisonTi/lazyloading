import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ReferenciaMkt extends BaseResourceModel {
  constructor(
    public ReferenciaMktId?: string,
    public ReferenciaId?: string,
    public ReferenciaDescricaoCompleta?,
    public ReferenciaMktInativo?: boolean,
    public ReferenciaMktDescricao?: string,
    public ReferenciaMktControlaEstoque?: boolean,
    public ReferenciaMktSomenteLogado?: boolean,
    public ReferenciaMktDisponibilidade?: number,
    public ReferenciaMktDataDisponivel?: Date,
    public ReferenciaMktTipoMercadoria?: number,
    public ReferenciaMktFreteGratis?: boolean,
    public ReferenciaMktCadastroUsuario?: string,
    public ReferenciaMktCadastroData?: string,
    public ReferenciaMktAlteracaoUsuario?: string,
    public ReferenciaMktAlteracaoData?: string,
    public MktPlaceId?: string
  ) {
    super();
    this.id = this.ReferenciaMktId
  }
  static fromJson(jsonData?: any): ReferenciaMkt {
    return Object.assign(new ReferenciaMkt(jsonData.ReferenciaMktId), jsonData);
  }
}

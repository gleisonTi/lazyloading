import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ReferenciaVariacao extends BaseResourceModel {
  constructor(
    public ReferenciaVariacaoId?: string,
    public ReferenciaId?: string,
    public VariacaoId?: string,
    public ReferenciaVariacaoInativo?: boolean,
    public ReferenciaVariacaoUsuario?: string,
    public ReferenciaVariacaoData?: string,
    public ReferenciaVariacaoGeraProduto?: boolean
  ) {
    super();
    this.id =  this.ReferenciaVariacaoId;
  }

  static fromJson(jsonData: any): ReferenciaVariacao {
    return Object.assign(new ReferenciaVariacao(jsonData.ReferenciaVariacaoId), jsonData);
  }
}

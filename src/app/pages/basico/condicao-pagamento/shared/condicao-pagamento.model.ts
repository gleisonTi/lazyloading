import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class CondicaoPagamento extends BaseResourceModel {
  constructor(
    public CondicaoPagamentoId?: string,
    public CondicaoPagamentoDescricao?: string,
    public CondicaoPagamentoUsuario?: string,
    public CondicaoPagamentoData?: string,
    public ComponenteHora?: string
  ) {
    super();
    this.id = this.CondicaoPagamentoId;
  }

  static fromJson(jsonData: any): CondicaoPagamento {
    return Object.assign(new CondicaoPagamento(jsonData.CondicaoPagamentoId), jsonData);
  }
}

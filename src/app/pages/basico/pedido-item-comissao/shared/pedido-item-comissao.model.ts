import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoItemComissao extends BaseResourceModel {
  constructor(
    public PedidoItemComissaoId?: string,
    public PedidoItemId?: string,
    public PedidoItemComissaoRepresentanteId?: string,
    public PedidoItemComissaoPercentual?: number,
    public PedidoItemComissaoTipoRepresentante?: number
  ) {
    super();
    this.id = this.PedidoItemComissaoId;
  }

  static fromJson(jsonData: any): PedidoItemComissao {
    return Object.assign(new PedidoItemComissao(jsonData.PedidoItemComissaoId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoComissao extends BaseResourceModel {
  constructor(
    public PedidoComissaoId?: string,
    public PedidoId?: string,
    public PedidoRepresentanteId?: string,
    public PedidoComissaoMedia?: number,
    public PedidoComissaoTipoRepresentante?: number
  ) {
    super();
     this.id = this.PedidoComissaoId
  }

  static fromJson(jsonData: any): PedidoComissao {
    return Object.assign(new PedidoComissao(jsonData.PedidoComissaoId), jsonData);
  }
}
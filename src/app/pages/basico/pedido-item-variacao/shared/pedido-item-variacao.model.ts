import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoItemVariacao extends BaseResourceModel {
  constructor(
    public pedidoItemVariacaoId?: string,
    public pedidoItemId?: string,
    public pedidoItemVariacaoVariacaoId?: string
  ) {
    super();
    this.pedidoItemVariacaoId = this.id;
  }

  static fromJson(jsonData: any): PedidoItemVariacao {
    return Object.assign(new PedidoItemVariacao(), jsonData);
  }
}
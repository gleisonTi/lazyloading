import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoConsumo extends BaseResourceModel {
  constructor(
    public PedidoConsumoId?: string,
    public PedidoItemId?: string,
    public ComponenteId?: string,
    public PedidoConsumoProdutoId?: string,
    public PedidoConsumoQuantidade?: string,
    public PedidoConsumoStatusBaixa?: number,
    public PedidoConsumoSetorId?: string,
    public PedidoConsumoEscalaId?: string,
    public PedidoConsumoUsuario?: string,
    public PedidoConsumoData?: string,
    public PedidoConsumoHora?: string
  ) {
    super();
    this.id = this.PedidoConsumoId;
  }

  static fromJson(jsonData: any): PedidoConsumo {
    return Object.assign(new PedidoConsumo(jsonData.PedidoConsumoId), jsonData);
  }
}

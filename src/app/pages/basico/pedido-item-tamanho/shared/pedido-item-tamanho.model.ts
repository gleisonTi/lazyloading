import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoItemTamanho extends BaseResourceModel {
  constructor(
    public PedidoItemTamanhoId?: string,
    public PedidoItemId?: string,
    public TamanhoId?: string,
    public PedidoItemTamanhoQuantidade?: string,
    public PedidoItemTamanhoQuantidadePlanejada?: string,
    public PedidoItemTamanhoQuantidadeFaturada?: string,
    public PedidoItemTamanhoQuantidadeOriginal?: string
  ) {
    super();
    this.id = this.PedidoItemTamanhoId;
  }

  static fromJson(jsonData: any): PedidoItemTamanho {
    return Object.assign(new PedidoItemTamanho(jsonData.PedidoItemTamanhoId), jsonData);
  }
}

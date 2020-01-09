import { TabelaPreco } from './../../tabela-preco/shared/tabela-preco.model';
import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class PedidoItem extends BaseResourceModel {
  constructor(
    public PedidoItemId?: string,
    public PedidoId?: string,
    public PedidoItemItem?: number,
    public PedidoItemPRODUTOId?: string,
    public PedidoItemReferenciaId?: string,
    public PedidoItemProdutoDescricao?: string,
    public PedidoItemProdutoDescricao2?: string,
    public PedidoItemTipo?: number,
    public PedidoItemSitSeparacao?: number,
    public PedidoItemObs?: string,
    public PedidoItemObs1?: string,
    public PedidoItemPreco?: string,
    public PedidoItemPrecoEspecial?: number,
    public PedidoItemAvaliacao?: number,
    public PedidoItemMaximoFicha?: string,
    public PedidoItemDataEntrega?: string,
    public PedidoItemInicioProducao?: string,
    public PedidoItemIndice?: string,
    public PedidoItemSituacao?: number,
    public PedidoItemBaixaEstoque?: number,
    public PedidoItemFrete?: string,
    public PedidoItemValorDesconto?: string,
    public PedidoItemPercentualDesconto?: number,
    public PedidoItemAliquotaIcms?: number,
    public PedidoItemBaseIcms?: string,
    public PedidoItemValorIcms?: string,
    public PedidoItemBaseIcmsST?: string,
    public PedidoItemValorIcmsST?: string,
    public PedidoItemAliquotaIcmsST?: number,
    public PedidoItemOrdem?: string,
    public PedidoItemSeparacaoUsuario?: string,
    public PedidoItemSeparacaoData?: string,
    public PedidoItemSeparacaoHora?: string,
    public PedidoItemCancelamentoUsuario?: string,
    public PedidoItemCancelamentoData?: string,
    public PedidoItemCancelamentoHora?: string,
    public PedidoItemEmbalagemId?: string,
    public PedidoProdutoPreco?: string,
    public ProdutoPrecoUnitario?: string,
    public PedidoItemComissao?: string,
    public PedidoQuantidade?: number,
    public PedidoItemComissaoId?: string,
    public PedidoItemTamanhoId?: string,
    public PedidoItemTamanho?: string, // TamanhoId
    public PedidoTabelaPreco?: string, // Tabela de preço definida no pedido
  ) {
    super();
    this.id = this.PedidoItemId;
  }

  static fromJson(jsonData: any): PedidoItem {
    return Object.assign(new PedidoItem(jsonData.PedidoItemId), jsonData);
  }
}

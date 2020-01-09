import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Variacao extends BaseResourceModel {
  constructor(
    public VariacaoId?: string,
    public ColecaoId?: string,
    public FabricanteId?: string,
    public VariacaoAutomaticaParaTodasReferencias?: boolean,
    public VariacaoCodigo?: string,
    public VariacaoColecao?: boolean,
    public VariacaoConsumo?: boolean,
    public VariacaoData?: string,
    public VariacaoDescricao?: string,
    public VariacaoFabricante?: boolean,
    public VariacaoHora?: string,
    public VariacaoIdPai?: string,
    public VariacaoInativo?: boolean,
    public VariacaoMarcado?: boolean,
    public VariacaoOrdemTela?: number,
    public VariacaoUsuario?: string,
    public VariacaoValorAcrescimo?: string,
    public gx_md5_hash?: string
    ) {
    super();
    this.id = this.VariacaoId
  }

  static fromJson(jsonData: any): Variacao {
    return Object.assign(new Variacao(jsonData.VariacaoId), jsonData);
  }
}

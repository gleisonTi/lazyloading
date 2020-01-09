import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class MovEstoque extends BaseResourceModel {
  constructor(
    public MovEstoqueId?: string,
    public MovEstoqueTipo?: number,
    public ProdutoId?: string,
    public MovEstoqueDoc?: string,
    public TipoDocumentoId?: string,
    public MovEstoqueItem?: number,
    public MovEstoqueData?: Date,
    public MovEstoqueUsuario?: string,
    public MovEstoqueDataGeracao?: Date,
    public MovEstoqueValor?: string,
    public MovEstoqueObs?: string,
    public MovEstoquePrg?: string,
    public MovEstoqueVersao?: string,
    public MovEstoqueSit?: number,
  ) {
    super();
    this.id = this.MovEstoqueId
  }
  static fromJson(jsonData: any): MovEstoque {
    return Object.assign(new MovEstoque(jsonData.MovEstoqueId), jsonData);
  }
}

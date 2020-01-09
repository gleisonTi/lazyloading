import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class MovEstoqueQtde extends BaseResourceModel {
  constructor(
    public MovEstoqueQtdeId?: string,
    public MovEstoqueId?: string,
    public TamanhoId?: string,
    public TipoEstoqueId?: string,
    public MovEstoqueQtdeAnterior?: string,
    public MovEstoqueQuantidade?: string,
    public MovEstoqueQtdeData?: Date,
    public MovEstoqueQtdeUsuario?: string,
  ) {
    super();
    this.id = this.MovEstoqueQtdeId;
  }
  static fromJson(jsonData: any): MovEstoqueQtde {
    return Object.assign(new MovEstoqueQtde(jsonData.MovEstoqueQtdeId), jsonData);
  }
}

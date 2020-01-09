import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class TipoEstoque extends BaseResourceModel {
  constructor(
    public TipoEstoqueId?: string,
    public TipoEstoqueDescricao?: string

  ) {
    super();
    this.id = this.TipoEstoqueId 
  }

  static fromJson(jsonData: any): TipoEstoque {
    return Object.assign(new TipoEstoque(jsonData.TipoEstoqueId), jsonData);
  }
}

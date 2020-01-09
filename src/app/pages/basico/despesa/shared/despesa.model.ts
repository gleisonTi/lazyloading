import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Despesa extends BaseResourceModel {
  constructor(
    public DespesaId?: string,
    public DespesaDescricao?: string,
  ) {
    super();
    this.id = this.DespesaId
  }
  static fromJson(jsonData: any): Despesa {
    return Object.assign(new Despesa(jsonData.DespesaId), jsonData);
  }
}

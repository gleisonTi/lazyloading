import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Banco extends BaseResourceModel {
  constructor(
    public BancoId?: string,
    public BancoDescricao?: string,
    public BancoNumero?: number
  ) {
    super();
    this.id = this.BancoId
  }
  static fromJson(jsonData: any): Banco {
    return Object.assign(new Banco(jsonData.BancoId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class TabelaPreco extends BaseResourceModel {
  constructor(
    public TabelaPrecoId?: string,
    public TabelaPrecoDescricao?: string,
    public TabelaPrecoValidade?: string,
    public TabelaPrecoUsuario?: string,
    public TabelaPrecoData?: string,
  ) {
    super();
    this.id = this.TabelaPrecoId;
  }

  static fromJson(jsonData: any): TabelaPreco {
    return Object.assign(new TabelaPreco(jsonData.TabelaPrecoId), jsonData);
  }
}

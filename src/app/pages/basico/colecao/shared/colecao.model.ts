import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Colecao extends BaseResourceModel {
  constructor(
    public ColecaoId?: string,
    public ColecaoDescricao?: string,
    public ColecaoUsuario?: string,
    public ColecaoData?: string,
    public ColecaoHora?: string,
    public ColecaoInativo?: boolean
  ) {
    super();
    this.id = this.ColecaoId
  }
  static fromJson(jsonData: any): Colecao {
    return Object.assign(new Colecao(jsonData.ColecaoId), jsonData);
  }
}

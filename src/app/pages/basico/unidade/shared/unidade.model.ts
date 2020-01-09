import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Unidade extends BaseResourceModel {
  constructor(
    public UnidadeId?: string,
    public UnidadeDescricao?: string,
    public UnidadeAbreviatura?: string,
    public UnidadeUtilizaGrade?: boolean

  ) {
    super();
    this.id = this.UnidadeId
  }

  static fromJson(jsonData: any): Unidade {
    return Object.assign(new Unidade(jsonData.UnidadeId), jsonData);
  }
}

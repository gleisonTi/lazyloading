import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export class Embalagem extends BaseResourceModel {
  constructor(
    public EmbalagemId?: string,
    public EmbalagemDescricao?: string,
  ) {
    super();
    this.id = this.EmbalagemId
  }
  static fromJson(jsonData: any): Embalagem {
    return Object.assign(new Embalagem(jsonData.EmbalagemId), jsonData);
  }
}

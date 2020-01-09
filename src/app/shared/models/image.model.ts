import { BaseResourceModel } from './base-resource.model';

export class Imagem extends BaseResourceModel  {
  constructor(
    public ImagemId?: string,
    public Imagem?: string,
    public TypeImage?: string,
  ) {
    super()
    this.id = this.ImagemId
  }
  static fromJson(jsonData: any): Imagem {
    return Object.assign(new Imagem(jsonData.ImagemId), jsonData);
  }
}

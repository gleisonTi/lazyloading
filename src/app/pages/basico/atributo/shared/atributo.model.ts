import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Atributo extends BaseResourceModel {
  constructor(
    public AtributoId?: string,
    public AtributoDescricao?: string,
    public AtributoOrdem?: number,
    public AtributoIdPai?: string,
    public AtributoDescricaoPai?: string,
    public AtributoTexto?: string,
    public AtributoPadrao?: boolean,
    public AtributoUsuario?: string,
    public AtributoData?: string,
    public AtributoDropValues?: Array<Atributo>,
  ) {
    super();
    this.id = this.AtributoId;
  }
  static fromJson(jsonData: any): Atributo {
    return Object.assign(new Atributo(jsonData.AtributoId), jsonData);
  }
}

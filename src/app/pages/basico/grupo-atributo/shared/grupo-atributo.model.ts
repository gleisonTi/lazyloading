import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class GrupoAtributo extends BaseResourceModel {
  constructor(
    public GrupoAtributoId?: string,
    public GrupoId?: string,
    public AtributoId?: string,
    public GrupoAtributoUsuario?: string,
    public AtributoPadrao?: boolean,
    public GrupoAtributoData?: string,
    public GrupoAtributoHora?: string
  ) {
    super();
    this.id = this.GrupoAtributoId
  }

  static fromJson(jsonData: any): GrupoAtributo {
    return Object.assign(new GrupoAtributo(jsonData.GrupoAtributoId), jsonData);
  }
}

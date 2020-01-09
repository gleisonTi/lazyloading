import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ReferenciaAtributo extends BaseResourceModel {
  constructor(
    public ReferenciaAtributoId?: string,
    public ReferenciaId?: string,
    public AtributoId?: string,
    public ReferenciaAtributoUsuario?: string,
    public ReferenciaAtributoData?: string,
    public ReferenciaAtributoInativo?: boolean

  ) {
    super();
    this.id =  this.ReferenciaAtributoId
  }

  static fromJson(jsonData: any): ReferenciaAtributo {
    return Object.assign(new ReferenciaAtributo(jsonData.ReferenciaAtributoId), jsonData);
  }
}

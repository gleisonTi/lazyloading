import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class AtributoMkt extends BaseResourceModel {
  constructor(
    public AtributoMktId?: string,
    public AtributoId?: string,
    public MktPlaceId?: string,
    public AtributoIdMktplace?: string,
    public AtributoMktUsuario?: string,
    public AtributoMktData?: string,
    public AtributoMktHora?: string
  ) {
    super();
    this.id = this.AtributoMktId
  }

  static fromJson(jsonData: any): AtributoMkt {
    return Object.assign(new AtributoMkt(jsonData.AtributoMktId), jsonData);
  }
}

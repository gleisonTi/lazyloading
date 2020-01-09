import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Componente extends BaseResourceModel {
  constructor(
    public ComponenteId?: string,
    public ComponenteDescricao?: string,
    public ComponenteUsuario?: string,
    public ComponenteData?: string,
    public ComponenteHora?: string
  ) {
    super();
    this.id = this.ComponenteId
  }

  static fromJson(jsonData: any): Componente {
    return Object.assign(new Componente(jsonData.ComponenteId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Fabricante extends BaseResourceModel {
  constructor(
    public FabricanteId?: string,
    public FabricanteDescricao?: string,
    public FabricanteUsuario?: string,
    public FabricanteData?: string,
    public FabricanteHora?: string
  ) {
    super();
    this.id = this.FabricanteId
  }

  static fromJson(jsonData: any): Fabricante {
    return Object.assign(new Fabricante(jsonData.FabricanteId), jsonData);
  }
}

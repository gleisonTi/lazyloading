import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ReferenciaMktCategoria extends BaseResourceModel {
  constructor(
    public ReferenciaMktCategoriaId?: string,
    public ReferenciaMktId?: string,
    public CategoriaId?: string,
  ) {
    super();
    this.id = this.ReferenciaMktCategoriaId
  }

  static fromJson(jsonData: any): ReferenciaMktCategoria {
    return Object.assign(new ReferenciaMktCategoria(jsonData.ReferenciaMktCategoriaId), jsonData);
  }
}

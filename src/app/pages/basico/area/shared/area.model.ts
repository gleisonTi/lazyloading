import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Area extends BaseResourceModel {
  constructor(
    public AreaId?: string,
    public AreaDescricao?: string,
  ) {
    super();
    this.id = this.AreaId
  }
  static fromJson(jsonData: any): Area {
    return Object.assign(new Area(jsonData.AreaId), jsonData);
  }
}

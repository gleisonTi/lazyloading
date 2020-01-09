import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class MktPlace extends BaseResourceModel {
  constructor(
    public MktPlaceId?: string,
  ) {
    super();
    this.id = this.MktPlaceId
  }
  static fromJson(jsonData: any): MktPlace {
    return Object.assign(new MktPlace(jsonData.MktPlaceId), jsonData);
  }
}

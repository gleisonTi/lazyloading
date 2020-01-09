import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Grade extends BaseResourceModel {
  constructor(
    public GradeId?: string,
    public GradeDescricao?: string,
    public GradeUsuario?: string,
    public GradeData?: string,
  ) {
    super();
    this.id = this.GradeId
  }

  static fromJson(jsonData: any): Grade {
    return Object.assign(new Grade(jsonData.GradeId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Setor extends BaseResourceModel {
  constructor(
    public SetorId?: string,
    public SetorDescricao?: string,
    public SetorUsuario?: string,
    public SetorData?: string,
    public SetorAbreviacao?: string,
    public SetorCodigo?: number
  ) {
    super();
    this.id = this.SetorId
  }

  static fromJson(jsonData: any): Setor {
    return Object.assign(new Setor(jsonData.SetorId), jsonData);
  }
}
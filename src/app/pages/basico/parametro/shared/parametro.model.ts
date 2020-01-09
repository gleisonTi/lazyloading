import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Parametro extends BaseResourceModel {
  constructor(
    public ParametroId?: string,
    public ParametroSistema?: string,
    public ParametroModulo?: string,
    public ParametroNome?: string,
    public ParametroValor?: string,
  ) {
    super()
    this.id = this.ParametroId;
  }
  static fromJson(jsonData: any): Parametro {
    return Object.assign(new Parametro(jsonData.ParametroId), jsonData);
  }
}

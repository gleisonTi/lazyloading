import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Escala extends BaseResourceModel {
  constructor(
    public escalaId?: string,
    public escalaDescricao?: string,
    public escalaUsuario?: string,
    public escalaData?: string,
    public escalaHora?: string
  ) {
    super();
    this.escalaId = this.id;
  }

  static fromJson(jsonData: any): Escala {
    return Object.assign(new Escala(), jsonData);
  }
}
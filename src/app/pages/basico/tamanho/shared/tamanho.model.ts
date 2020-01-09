import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Tamanho extends BaseResourceModel {

  constructor(
    public TamanhoId?: string,
    public GradeId?: string,
    public Tamanho?: string,
    public TamanhoPercentualAumento?: number,
    public TamanhoVariacaoConsumo?: string,
    public TamanhoUsuario?: string,
    public TamanhoData?: string,

  ) {
    super();
    this.id = this.TamanhoId
  }

  static fromJson(jsonData: any): Tamanho {
    console.log(jsonData)
    return Object.assign(new Tamanho(jsonData.TamanhoId), jsonData);
  }
}

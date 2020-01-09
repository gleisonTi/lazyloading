import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Grupo extends BaseResourceModel {
  constructor(
    public GrupoId?: string,
    public GrupoDescricao?: string,
    public GrupoIdPai?: string,
    public GrupoPaiDescricao?: string,
    public GrupoNCM?: string,
    public GrupoUsuario?: string,
    public GrupoData?: string,
    public GrupoCodigo?: string,
    public GrupoPesoBruto?: string,
    public GrupoPesoLiquido?: string,
    public GrupoApareceConsumo?: boolean,
    public GrupoSegmento?: string,
    public GrupoFamilia?: string,
    public GrupoClasse?: string,
    public GrupoSubClasse?: string,
    public GrupoSequencialProduto?: number
  ) {
    super();
     this.id = this.GrupoId
  }

  static fromJson(jsonData: any): Grupo {
    return Object.assign(new Grupo(jsonData.GrupoId), jsonData);
  }
}

import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Referencia extends BaseResourceModel {
  constructor(
    public ReferenciaId?: string,
    public ReferenciaCodigo?: string,
    public FabricanteId?: string,
    public ColecaoId?: string,
    public ReferenciaDescricaoCompleta?: string,
    public ReferenciaUsuarioCadastro?: string,
    public ReferenciaDataCadastro?: string,
    public ReferenciaHoraCadastro?: string,
    public ReferenciaUsuarioAlteracao?: string,
    public ReferenciaDataAlteracao?: string,
    public ReferenciaHoraAlteracao?: string,
    public ReferenciaSequencia?: number,
    public GrupoId?: string,
    public UnidadeId?: string,
    public ReferenciaIdMktPlace?: string,
    public ReferenciaInativo?: boolean,
    public UnidadeDescricao?: string,
    public GrupoDescricao?: string

  ) {
    super();
     this.id  = this.ReferenciaId
  }

  static fromJson(jsonData: any): Referencia {
    return Object.assign(new Referencia(jsonData.ReferenciaId), jsonData);
  }
}

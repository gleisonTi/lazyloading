import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Agenda extends BaseResourceModel {
  constructor(
    public AgendaId?: string,
    public ClienteCelular?: string,
    public UsuarioNome?: string,
    public ClienteEmail?: string,
    public ClienteId?: string,
    public AgendaObservacao?: string,
    public AgendaSituacao?: number,
    public AgendaData?: string,
    public AgendaDataAlteracaoCadastro?: string,
    public AgendaDataProximoContato?: string,
    public AgendaTipoContato?: string,
    public AgendaUsuarioAlteracaoCadastro?: string,
    public ProdutoDescricao?: string,
    public ProdutoId?: string,
    public UsuarioId?: string
  ) {
    super();
    this.id = this.AgendaId
  }

  static fromJson(jsonData: any): Agenda {
    return Object.assign(new Agenda(jsonData.AgendaId), jsonData);
  }
}
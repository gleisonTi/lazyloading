import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ClienteEndereco extends BaseResourceModel {
  constructor(
    public ClienteEnderecoId?: string,
    public ClienteId?: string,
    public ClienteEnderecoTipo?: string,
    public ClienteEnderecoSequencia?: string,
    public ClienteEnderecoPadrao?: boolean,
    public ClienteEnderecoCep?: string,
    public ClienteEndereco?: string,
    public ClienteEnderecoNumero?: string,
    public ClienteEnderecoComplemento?: string,
    public ClienteEnderecoBairro?: string,
    public ClienteEnderecoCidade?: string,
    public ClienteEnderecoUF?: string,
    public ClienteEnderecoPais?: string,
    public ClienteEnderecoCodigoMunicipio?: string,
    public ClienteEnderecoCNPJ?: string,
    public ClienteEnderecoCPF?: string,
    public ClienteEnderecoInscricaoEstadual?: string,
    public ClienteEnderecoTelefone?: string,
    public ClienteEnderecoCadastroUsuario?: string,
    public ClienteEnderecoCadastroData?: Date,
    public ClienteEnderecoAlteracaoUsuario?: string,
    public ClienteEnderecoAlteracaoData?: string,
  ) {
    super();
    this.id = this.ClienteEnderecoId
  }
  static fromJson(jsonData: any): ClienteEndereco {
    return Object.assign(new ClienteEndereco(jsonData.ClienteEnderecoId), jsonData);
  }
}

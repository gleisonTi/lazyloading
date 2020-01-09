import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class Cliente extends BaseResourceModel {
  constructor(
    public ClienteId?: string,
    public ClienteCodigo?: string,
    public ClienteNome?: string,
    public ClienteTipoCliente?: string,
    public ClienteTipoFornecedor?: boolean,
    public ClienteTipoTransportadora?: boolean,
    public ClienteTipoRepresentante?: boolean,
    public ClienteTipoPessoa?: boolean,
    public ClienteTipoOutros?: boolean,
    public ClienteTelefone?: string,
    public ClienteCelular?: string,
    public ClienteCodigoSuframa?: string,
    public ClienteCNPJ?: string,
    public ClienteCPF?: string,
    public ClienteInscricaoEstadual?: string,
    public ClienteInscricaoMunicipal?: string,
    public ClienteTransportadoraId?: string,
    public ClienteNomeFantasia?: string,
    public ClienteEmail?: string,
    public ClienteEmailNfe?: string,
    public ClienteDataCadastro?: string,
    public ClienteCodigoContabil?: string,
    public ClienteLimiteCredito?: string,
    public ClienteTipoFrete?: string,
    public ClienteBancoId?: string,
    public ClienteCondicaoPagamentoId?: string,
    public ClienteAreaId?: string,
    public ClienteAtivo?: boolean,
    public ClienteTipoCobrancaId?: string,
    public ClienteDespesaId?: string,
    public ClienteNotePad?: string,
    public ClienteGenero?: string,
    public ClienteCadastroUsuario?: string,
    public ClienteCadastroData?: string,
    public ClienteAlteracaoUsuario?: string,
    public ClienteAlteracaoData?: string,
  ) {
    super();
    this.id = this.ClienteId
  }
  static fromJson(jsonData?: any): Cliente {
    return Object.assign(new Cliente(jsonData.ClienteId), jsonData);
  }
}

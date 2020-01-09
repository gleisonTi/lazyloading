import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ClienteContato extends BaseResourceModel {
    constructor(
        public ClienteContatoId?: string,
        public ClienteId?: string,
        public ClienteContatoSequencia?: string,
        public TipoContatoId?: string,
        public ClienteContatoNome?: string,
        public ClienteContatoCelular?: string,
        public ClienteContatoEmail?: string,
        public ClienteContatoCadastroUsuario?: string,
        public ClienteContatoCadastroData?: string,
        public ClienteContatoAlteracaoUsuario?: string,
        public ClienteContatoAlteracaoData?: string,
    ) {
        super();
        this.id = this.ClienteContatoId;
    }
    static fromJson(jsonData: any): ClienteContato {
        return Object.assign(new ClienteContato(jsonData.ClienteContatoId), jsonData);
    }
}

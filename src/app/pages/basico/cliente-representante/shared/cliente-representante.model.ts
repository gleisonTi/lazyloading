import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class ClienteRepresentante extends BaseResourceModel {
    constructor(
        public ClienteRepresentanteId?: string,
        public ClienteId?: string,
        public ClienteRepresentanteTipo?: string,
        public RepresentanteId?: string,
        public ClienteRepresentanteComissao?: number,
        public ClienteRepresentanteContaDeposito?: string,
        public ClienteRepresentanteCadastroUsuario?: string,
        public ClienteRepresentanteCadastroData?: string,
        public ClienteRepresentanteAlteracaoUsuario?: string,
        public ClienteRepresentanteAlteracaoData?: string,
    ) {
        super();
        this.id = this.ClienteRepresentanteId;
    }
    static fromJson(jsonData: any): ClienteRepresentante {
        return Object.assign(new ClienteRepresentante(jsonData.ClienteRepresentanteId), jsonData);
    }
}

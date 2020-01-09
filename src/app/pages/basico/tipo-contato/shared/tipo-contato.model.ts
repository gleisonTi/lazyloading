import { BaseResourceModel } from '../../../../shared/models/base-resource.model';

export class TipoContato extends BaseResourceModel {
    constructor(
        public TipoContatoId?: string,
        public TipoContatoDescricao?: string,
        public TipoContatoCadastroUsuario?: string,
        public TipoContatoCadastroData?: string,
        public TipoContatoAlteracaoUsuario?: string,
        public TipoContatoAlteracaoData?: string,
    ) {
        super();
        this.id = this.TipoContatoId;
    }
    static fromJson(jsonData: any): TipoContato {
        return Object.assign(new TipoContato(jsonData.TipoContatoId), jsonData);
    }
}
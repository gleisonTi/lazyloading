import { BaseResourceModel } from '../../../../shared/models/base-resource.model';
import { Cliente } from './cliente.model';
import { ClienteEndereco } from '../../cliente-endereco/shared/cliente-endereco.model';
import { ClienteRepresentante } from '../../cliente-representante/shared/cliente-representante.model';
import { ClienteContato } from '../../cliente-contato/shared/cliente-contato.model';

export interface ClienteFull  {
     Cliente?: Cliente;
     ClienteEnderecos?: ClienteEndereco[];
     ClienteRepresentantes?: ClienteRepresentante[];
     ClienteContatos?: ClienteContato[];

}

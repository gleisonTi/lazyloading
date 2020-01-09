import { Injectable, Injector } from '@angular/core';
import { TabelaPreco } from './tabela-preco.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoService extends BaseRecursoService<TabelaPreco> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/TabelaPrecos`, `${INCCA_WEB_URL}/basico/TabelaPreco`,
      injector,
      TabelaPreco.fromJson);
  }

}

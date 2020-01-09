import { Injectable, Injector } from '@angular/core';
import { Despesa } from './despesa.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class DespesaService extends BaseRecursoService<Despesa> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/despesas`, `${INCCA_WEB_URL}/basico/despesa`,
      injector,
      Despesa.fromJson);
  }

}

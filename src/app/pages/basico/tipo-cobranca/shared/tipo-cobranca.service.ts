import { Injectable, Injector } from '@angular/core';
import { TipoCobranca } from './tipo-cobranca.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class TipoCobrancaService extends BaseRecursoService<TipoCobranca> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/TiposCobranca`, `${INCCA_WEB_URL}/basico/tipoCobranca`,
      injector,
      TipoCobranca.fromJson);
  }

}

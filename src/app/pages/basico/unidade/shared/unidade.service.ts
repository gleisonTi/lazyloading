import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Unidade } from './unidade.model';

@Injectable({
  providedIn: 'root'
})
export class UnidadeService extends BaseRecursoService<Unidade> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/unidades`, `${INCCA_WEB_URL}/basico/unidade`,
      injector,
      Unidade.fromJson);
  }

}

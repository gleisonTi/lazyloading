import { Injectable, Injector } from '@angular/core';
import { Componente } from './componente.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';

@Injectable({
  providedIn: 'root'
})
export class ComponenteService extends BaseRecursoService<Componente> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/componentes`, `${INCCA_WEB_URL}/basico/componente`,
      injector,
      Componente.fromJson);
  }
}
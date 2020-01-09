import { Agenda } from './agenda.model';
import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})

export class AgendaService extends BaseRecursoService<Agenda> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Agendas`, `${INCCA_WEB_URL}/basico/Agenda`,
      injector,
      Agenda.fromJson);
    }
}
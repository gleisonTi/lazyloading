import { Injectable, Injector } from '@angular/core';
import { Banco } from './banco.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})
export class BancoService extends BaseRecursoService<Banco> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Bancos`, `${INCCA_WEB_URL}/basico/Banco`,
      injector,
      Banco.fromJson);
  }

}

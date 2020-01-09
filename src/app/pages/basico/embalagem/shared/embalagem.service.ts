import { Injectable, Injector } from '@angular/core';
import { Embalagem } from './embalagem.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { State } from '@progress/kendo-data-query';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';

@Injectable({
  providedIn: 'root'
})
export class EmbalagemService extends BaseRecursoService<Embalagem> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/embalagens`, `${INCCA_WEB_URL}/basico/embalagem`,
      injector,
      Embalagem.fromJson);
  }
}

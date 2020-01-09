import { Injectable, Injector } from '@angular/core';
import { TipoContato } from './tipo-contato.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})
export class TipoContatoService extends BaseRecursoService<TipoContato> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/TipoContatos`, `${INCCA_WEB_URL}/basico/TipoContato`,
      injector,
      TipoContato.fromJson);
  }

}
import { Injectable, Injector } from '@angular/core';
import { Colecao } from './colecao.model';
import { BaseRecursoService } from '../../../../shared/services/base-recurso.service';
//import { HttpClient } from '@angular/common/http';
import {State} from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
@Injectable({
  providedIn: 'root'
})

export class ColecaoService extends BaseRecursoService<Colecao> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/colecoes`, `${INCCA_WEB_URL}/basico/colecao`,
      injector,
      Colecao.fromJson);
  }

}


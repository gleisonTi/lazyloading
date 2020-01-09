import { Injectable, Injector } from '@angular/core';
import { MovEstoque } from './mov-estoque.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Colecao } from 'src/app/pages/basico/colecao/shared/colecao.model';

@Injectable({
  providedIn: 'root'
})
export class MovEstoqueService extends BaseRecursoService<MovEstoque> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/Estoque/MovEstoques`, `${INCCA_WEB_URL}/Estoque/MovEstoque`,
      injector,
      MovEstoque.fromJson);
  }

}

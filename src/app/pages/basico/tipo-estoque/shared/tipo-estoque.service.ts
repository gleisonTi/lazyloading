import { Injectable, Injector } from '@angular/core';
import { TipoEstoque } from './tipo-estoque.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

@Injectable({
  providedIn: 'root'
})
export class TipoEstoqueService extends BaseRecursoService<TipoEstoque> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/TiposEstoque`, `${INCCA_WEB_URL}/basico/TipoEstoque`,
      injector,
      TipoEstoque.fromJson);
  }
}
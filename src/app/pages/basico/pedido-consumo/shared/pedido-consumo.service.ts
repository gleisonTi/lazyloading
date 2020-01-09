import { Injectable, Injector } from '@angular/core';
import { PedidoConsumo } from './pedido-consumo.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoConsumoService  extends BaseRecursoService<PedidoConsumo> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/PedidoConsumos`, `${INCCA_WEB_URL}/basico/PedidoConsumo`,
      injector,
      PedidoConsumo.fromJson);
  }

  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?PedidoId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }
}

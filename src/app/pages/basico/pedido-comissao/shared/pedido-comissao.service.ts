import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { PedidoComissao } from './pedido-comissao.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoComissaoService extends BaseRecursoService<PedidoComissao> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/PedidosComissao`, `${INCCA_WEB_URL}/basico/PedidoComissao`,
      injector,
      PedidoComissao.fromJson);
  }

  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?PedidoId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public save(data: PedidoComissao, isNew?: boolean): Observable<PedidoComissao> {

    if (isNew) {
      return this.create(data);
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe(() => {this.read(this.state, res.PedidoId)});
      })
      );
    }
  }

}

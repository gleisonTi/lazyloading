import { Injectable, Injector } from '@angular/core';
import { PedidoItemTamanho } from './pedido-item-tamanho.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemTamanhoService extends BaseRecursoService<PedidoItemTamanho> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/PedidoItensTamanho`, `${INCCA_WEB_URL}/basico/PedidoItemTamanho`,
      injector,
      PedidoItemTamanho.fromJson);
  }

  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000';
    }
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?PedidoItemId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public save(data: PedidoItemTamanho, isNew?: boolean): Observable<PedidoItemTamanho>  {
    if (isNew) {
      return this.create(data);
    } else {
      console.log(data);
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe(() => this.read(this.state, this.queryId));
      })
      );
    }
  }



}

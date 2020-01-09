import { Injectable, Injector } from '@angular/core';
import { ProdutoSku } from './produto-sku.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoSkuService extends BaseRecursoService<ProdutoSku> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutosSku`, `${INCCA_WEB_URL}/basico/ProdutoSku`,
      injector,
      ProdutoSku.fromJson);
  }

  getAll(state?: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ProdutoId=${queryId}&${query}`
    , ).pipe(
    catchError(this.handleError)
    );
  }

}

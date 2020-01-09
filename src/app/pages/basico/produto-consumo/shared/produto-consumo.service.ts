import { Injectable, Injector } from '@angular/core';
import { ProdutoConsumo } from './produto-consumo.model';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoConsumoService extends BaseRecursoService<ProdutoConsumo> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutosConsumo`, `${INCCA_WEB_URL}/basico/ProdutoConsumo`,
      injector,
      ProdutoConsumo.fromJson);
  }


  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    console.log('Consumo get:'+queryId)
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ProdutoId=${queryId}&${query}`,  ).pipe(
      catchError(this.handleError)
    );
  }


}

import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { ProdutoComposicao } from './produto-composicao.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL, } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoComposicaoService extends BaseRecursoService<ProdutoComposicao> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutosComposicao`, `${INCCA_WEB_URL}/basico/ProdutoComposicao`,
      injector,
      ProdutoComposicao.fromJson);
  }

  getAll(state: State, queryId?: any): Observable<GridDataResult> {
    this.loadingService.showLoading();
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ProdutoId=${queryId}&${query}`).pipe(
      catchError(this.handleError),
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          catchError(this.handleError),
            this.loadingService.hideLoading();
        }
      })
    );
  }
}

import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Colecao } from 'src/app/pages/basico/colecao/shared/colecao.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Produto } from 'src/app/pages/basico/produto/shared/produto.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchProdutosService extends BaseRecursoService<Produto> {

  private opemSearchState = new BehaviorSubject<boolean>(false);
  public opemSearch = this.opemSearchState.asObservable();

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutosPorFiltro`, `${INCCA_WEB_URL}/basico/Produtoasdsadasdas`,
      injector,
      Produto.fromJson);
  }

  opemSearchModal(opem: boolean) {
    this.opemSearchState.next(opem);
  }

  getAll(state?: State, queryId?: any): Observable<GridDataResult> {

    this.loadingService.showLoading();
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }

    if (!queryId.TabelaPrecoId) {
      queryId.TabelaPrecoId = '60a81487-eba5-41b0-85ec-fd8b7900a806' // se for null utiliza tabela de preço padrão
    }
    return this.http.get<GridDataResult>
      (`${this.apiPathGetAll}?filter=${queryId.text}&TabelaPrecoId=${queryId.TabelaPrecoId}&${query}`).pipe(
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

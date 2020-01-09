import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { ProdutoCategoria } from './produto-categoria.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProdutoCategoriaService extends BaseRecursoService<ProdutoCategoria> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/MarketPlace/ProdutoCategorias`, `${INCCA_WEB_URL}/MarketPlace/ProdutoCategoria`,
      injector,
      ProdutoCategoria.fromJson);
  }

  getAll(state?: State, queryId?:any): Observable<GridDataResult> { // uso de polimorfismo para filtragem de dados
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

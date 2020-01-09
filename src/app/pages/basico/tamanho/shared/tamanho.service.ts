import { Injectable, Injector } from '@angular/core';
import { Tamanho } from './tamanho.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { ProdutoComposicao } from '../../produto-composicao/shared/produto-composicao.model';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TamanhoService extends BaseRecursoService<Tamanho> {

  public state: State
  httpClient: any;

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Tamanhos`, `${INCCA_WEB_URL}/basico/Tamanho`,
      injector,
      ProdutoComposicao.fromJson);
  }

  getAll(state?: State, queryId?:any): Observable<GridDataResult> {
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?GradeId=${queryId}&${query}`,  ).pipe(
      catchError(this.handleError)
    );
  }
}

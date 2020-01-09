import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { ProdutoComposicao } from '../../produto-composicao/shared/produto-composicao.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError } from 'rxjs/operators';
import { ProdutoAtributo } from './produto-atributo.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoAtributoService extends BaseRecursoService<ProdutoAtributo> {

  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutoAtributos`, `${INCCA_WEB_URL}/basico/ProdutoAtributo`,
      injector,
      ProdutoAtributo.fromJson);
  }

  getProdutoAtributo(state: State, queryId?: any): Observable<ProdutoAtributo[]> {
    // let query = ''
    // // if (state) {
    // //   query = this.createQuery(state)
    // // }
    return this.http.get<ProdutoAtributo[]>(`${this.apiPathGetAll}?ProdutoId=${queryId}`).pipe(
      catchError(this.handleError)
    );
  }
}

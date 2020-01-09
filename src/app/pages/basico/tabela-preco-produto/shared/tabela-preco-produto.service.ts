import { Injectable, Injector } from '@angular/core';
import { TabelaPrecoProduto } from './tabela-preco-produto.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TabelaPrecoProdutoService extends BaseRecursoService<TabelaPrecoProduto> {

  public state: State;
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/TabelaPrecoProdutos`, `${INCCA_WEB_URL}/basico/TabelaPrecoProduto`,
      injector,
      TabelaPrecoProduto.fromJson);
  }

  getAll(state: State, queryId?: any): Observable<GridDataResult> {
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?TabelaPrecoId=${queryId}&${query}`).pipe(
      catchError(this.handleError)
    );
  }

  public save(data: TabelaPrecoProduto, isNew?: boolean): Observable<TabelaPrecoProduto> {
    if (isNew) {
      return this.create(data);
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe(( res ) => {});
      }));
    }
  }

  public produtoPossuiPreco(ProdutoId: string, TabelaPrecoId: string): Observable<any> {
    const body = { ProdutoId, TabelaPrecoId };

    console.log(body);
    return this.http.post<any>(`${INCCA_WEB_URL}/Basico/ProdutoPossuiPreco`, JSON.stringify(body), );
  }
}

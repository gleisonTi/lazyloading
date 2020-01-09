import { Injectable, Injector } from '@angular/core';
import { PedidoItemComissao } from './pedido-item-comissao.model';
import { PedidoItemTamanho } from '../../pedido-item-tamanho/shared/pedido-item-tamanho.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State } from '@progress/kendo-data-query';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemComissaoService extends BaseRecursoService<PedidoItemComissao> {


  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/PedidoItensComissao`, `${INCCA_WEB_URL}/basico/PedidoItemComissao`,
      injector,
      PedidoItemComissao.fromJson);
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


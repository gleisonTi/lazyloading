import { Messages, Message } from './../../../../shared/models/message.model';
import { Injectable, Injector } from '@angular/core';
import { PedidoItem } from './pedido-item.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable, BehaviorSubject } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { catchError, map, tap } from 'rxjs/operators';
import { PedidoService } from '../../pedido/shared/pedido.service';

@Injectable({
  providedIn: 'root'
})
export class PedidoItemService extends BaseRecursoService<PedidoItem> {

  private addNewItem = new BehaviorSubject<PedidoItem>(null);
  public newItem = this.addNewItem.asObservable();

  constructor(protected injector: Injector, public pedidoService: PedidoService) {
    super(`${INCCA_WEB_URL}/basico/PedidoItens`, `${INCCA_WEB_URL}/basico/PedidoItem`,
      injector,
      PedidoItem.fromJson);
  }

  public save(data: PedidoItem, isNew?: boolean) {
    if (isNew) {
      data.PedidoItemItem = 1;
      return this.create(data).pipe(tap(res => this.read(this.state, res.PedidoId)));
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe(() => this.read(this.state, data.PedidoId));
      })
      );
    }
  }

  addNewItemPedido(pedidoitem: PedidoItem) {
    this.addNewItem.next(pedidoitem);

  }

  getAll(state: State, queryId?: any): Observable<GridDataResult> {
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }

    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?PedidoId=${queryId}&${query}`).pipe(
      tap(() => this.getTotalPedido(queryId)),
      catchError(this.handleError)
    );
  }

  public getTotalPedido(PedidoId: string) {
    const body = { PedidoId };
    this.http.post<any>(`${INCCA_WEB_URL}/basico/GetTotalPedido`, JSON.stringify(body))
      .subscribe(res => {
        this.pedidoService.updateTotal(res);
      });
  }

  public removeItemPedido(PedidoItemId: string): Observable<any> {
    const body = { PedidoItemId };
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/RemoveItemPedido`, JSON.stringify(body));
  }

  public updateComissaoPedido(PedidoId: string): Observable<any> {
    const body = { PedidoId };
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/updateComissaoPedido`, JSON.stringify(body));
  }

  public setPedidoItem(PedidoItemSDT: PedidoItem, isNewPedido: boolean): Observable<{ messages: Message[], PedidoItem: PedidoItem }> {
    const body = { PedidoItemSDT, isNewPedido };
    return this.http.post<{ messages: Message[], PedidoItem: PedidoItem }>(`${INCCA_WEB_URL}/basico/SetPedidoItem`, JSON.stringify(body))
      .pipe(tap(res => {
        this.read(this.state, res.PedidoItem.PedidoId);
        this.addNewItem.next(null);
      }));
  }

  // updateCart(data: { data: PedidoItem[], total: number }, isDelete: boolean) {
  //   let totalPedido = '0';
  //   if (data.data.length > 0) {
  //     totalPedido = data.data.length > 1 ?
  //       data.data.map(item => item.PedidoItemPreco).reduce((accumulator, currentValue) => accumulator + currentValue) :
  //       data.data[0].PedidoItemPreco;
  //   }
  //   // update preço total e count itens
  //   this.dataSource.next({ countItens: isDelete ? data.total + 1 : data.total, total: parseFloat(totalPedido) });
  //   this.pedidoItensSubject.next(data);
  // }

}

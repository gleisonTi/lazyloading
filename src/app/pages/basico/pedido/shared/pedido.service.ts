import { Messages, Message } from './../../../../shared/models/message.model';
import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { Pedido } from './pedido.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL, } from 'src/app/shared/services/api.inccaWeb';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap, catchError } from 'rxjs/operators';
import { PedidoItem } from '../../pedido-item/shared/pedido-item.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PedidoService extends BaseRecursoService<Pedido> {

  // subject criado para manipular o valor total do pedido e tambem a quantidade de itens no pedido
  private dataSource = new BehaviorSubject<{ countItens: number, total: number }>({ countItens: 0, total: 0 });
  public data = this.dataSource.asObservable();
  // subject criado para adicionar itens no pedido sem salvar no banco
  private pedidoItensSubject = new BehaviorSubject<{ data: PedidoItem[], total: number }>({ data: [], total: 0 });
  public pedidoItens = this.pedidoItensSubject.asObservable();

  private formGroupSubject = new BehaviorSubject<FormGroup>(new FormGroup({}));
  public formSubject = this.formGroupSubject.asObservable();

  public state: State;
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Pedidos`, `${INCCA_WEB_URL}/basico/Pedido`,
      injector,
      Pedido.fromJson);
  }

  public save(data: Pedido, isNew?: boolean): Observable<Pedido> {
    if (isNew) {
      console.log(data);
      return this.create(data).pipe(tap(() => this.read(this.state, this.queryId)));
    } else {
      return this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id;
        this.update(data).subscribe((res) => {
          this.read(this.state, this.queryId);
        });
      })
      );
    }
  }

  updateCart(data: { data: PedidoItem[], total: number }) {
    let totalPedido = '0';
    if (data.data.length > 0) {
      totalPedido = data.data.length > 1 ?
        data.data.map(item => item.PedidoItemPreco).reduce((accumulator, currentValue) => accumulator + currentValue) :
        data.data[0].PedidoItemPreco;
    }
    // update preço total e count itens
    this.dataSource.next({ countItens: data.total, total: parseFloat(totalPedido) });
    this.pedidoItensSubject.next(data);
  }

  updateTotal(data: { countItens: number, total: number }) {
    this.dataSource.next(data);
  }

  updateFormGroup(formGroup: FormGroup) {
    this.formGroupSubject.next(formGroup);
  }

  public checkCodProduto(Table: string, atribute: string): Observable<{ contains: boolean, message: string }> {
    const body = { Table, atribute };
    return this.http.post<any>(`${INCCA_WEB_URL}/Utils/SearchUkAtribute`, JSON.stringify(body)).pipe(map(res => res.response));
  }

  public getNewCodigoPedido(): Observable<{ Codigo: number }> {
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/GetNewCodigoPedido`, JSON.stringify({})).pipe(map(res => res));
  }

  public removePedido(PedidoId: string): Observable<Messages> {
    const body = { PedidoId };
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/RemovePedido`, JSON.stringify(body));
  }
  // atualiza tabela de preço do pedido para atualizar os preçoes dos itens já incluidos
  public updatePriceItensPedido(PedidoId: string, TabelaPrecoId: string): Observable<{ message: string, messageItem: string }> {
    const body = { PedidoId, TabelaPrecoId };
    return this.http.post<{ message: string, messageItem: string }>(`${INCCA_WEB_URL}/basico/UpdatePriceItensPedido`, JSON.stringify(body));
  }

  public setPedido(PedidoSDT: Pedido): Observable<{ messages: Message[], Pedido: Pedido }> {
    const body = { PedidoSDT };
    return this.http.post<{ messages: Message[], Pedido: Pedido }>(`${INCCA_WEB_URL}/basico/SetPedido`, JSON.stringify(body));
  }
  public verificaSenhaVenda(UsuarioSenhaVenda: Pedido): Observable<{ isValid: boolean }> {
    const body = { UsuarioSenhaVenda };
    return this.http.post<{ isValid: boolean }>(`${INCCA_WEB_URL}/Autenticacao/VerificaSenhaVenda`, JSON.stringify(body));
  }


}

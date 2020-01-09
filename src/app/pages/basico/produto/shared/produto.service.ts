import { Message } from './../../../../shared/models/message.model';
import { Injectable, Injector } from "@angular/core";
import { INCCA_WEB_URL } from "src/app/shared/services/api.inccaWeb";
import { Produto } from "./produto.model";
import { BaseRecursoService } from "src/app/shared/services/base-recurso.service";
import { tap, map, catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { ReturnStatement, jitExpression } from "@angular/compiler";
import { State } from "@progress/kendo-data-query";
import { GridDataResult } from "@progress/kendo-angular-grid";

@Injectable({
  providedIn: "root"
})
export class ProdutoService extends BaseRecursoService<Produto> {
  constructor(protected injector: Injector) {
    super(
      `${INCCA_WEB_URL}/basico/produtos`,
      `${INCCA_WEB_URL}/basico/produto`,
      injector,
      Produto.fromJson
    );
  }
  public save(data: Produto, isNew?: boolean): Observable<Produto> {
    if (isNew) {
      return this.create(data).pipe(
        tap(() => this.read(this.state, this.queryId))
      );
    } else {
      return this.getById(data.id).pipe(
        tap(res => {
          data.gx_md5_hash = res.gx_md5_hash;
          data.id = res.id;
          this.update(data).subscribe(res => {
            this.read(this.state, this.queryId);
          });
        })
      );
    }
  }

  getAll(state?: State, queryId?: any, atributo?: string): Observable<GridDataResult> {
    let query = "";
    if (state) {
      query = this.createQuery(state);
    }
    if (!queryId) {
      return this.http
        .get<GridDataResult>(
          `${this.apiPathGetAll}?${query}&TabelaPrecoId=${queryId}`
        )
        .pipe(catchError(this.handleError));
    } else {
      return this.http
        .get<GridDataResult>(
          `${INCCA_WEB_URL}/basico/ProdutosComPreco?${query}&TabelaPrecoId=${queryId}`
        )
        .pipe(catchError(this.handleError));
    }
  }

  public setProdutoAndProdutoAtributos(ProdutoSDT: Produto, isNew: boolean):
    Observable<{ responseProdutoSDT: Produto, messages: Array<Message> }> {
    this.loadingService.showLoading();

    const body = { ProdutoSDT, isNew };
    return this.http.post<any>(
      `${INCCA_WEB_URL}/basico/setProdutoAndProdutoAtributos`,
      JSON.stringify(body)
    ).pipe(tap({
      next: value => {
        this.loadingService.hideLoading();
        this.read(this.state)
      },
      error: error => {
        catchError(this.handleError),
          this.loadingService.hideLoading();
        this.read(this.state);
      }
    })
    );
  }

  public removeProdutoAndProdutoAtributos(ProdutoId: string): Observable<{ messages: Message[] }> {
    const body = { ProdutoId };
    this.loadingService.showLoading();
    return this.http
      .post<any>(
        `${INCCA_WEB_URL}/basico/removeProdutoAndProdutoAtributos`,
        JSON.stringify(body)
      )
      .pipe(tap({
        next: value => {
          this.loadingService.hideLoading();
          this.read(this.state);
        },
        error: error => {
          catchError(this.handleError),
            this.loadingService.hideLoading();
          this.read(this.state);
        }
      })
      );
  }

  public checkCodProduto(Table: string, atribute: string): Observable<{ contains: boolean; message: string }> {
    const body = { Table, atribute };
    return this.http
      .post<any>(
        `${INCCA_WEB_URL}/Utils/SearchUkAtribute`,
        JSON.stringify(body)
      )
      .pipe(map(res => res.response));
  }

  public getNewCodigoProduto(): Observable<{ Codigo: number }> {
    return this.http.post<any>(
      `${INCCA_WEB_URL}/basico/GetNewCodigoProduto`,
      JSON.stringify({})
    );
  }
}

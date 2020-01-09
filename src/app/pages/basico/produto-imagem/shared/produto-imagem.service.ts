import { Message } from './../../../../shared/models/message.model';
import { Injectable, Injector } from '@angular/core';
import { ProdutoImagem } from './produto-imagem.model';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL, } from 'src/app/shared/services/api.inccaWeb';
import { Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class ProdutoImagemService extends BaseRecursoService<ProdutoImagem> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/ProdutoImagens`, `${INCCA_WEB_URL}/basico/ProdutoImagem`,
      injector,
      ProdutoImagem.fromJson);
  }

  public postFile(NomeImagem: string, Imagem: string, TypeImage: string): Observable<{ resultString: string, message: Message }> {
    let Image = {
      Imagem,
      TypeImage,
      NomeImagem
    }
    this.loadingService.showLoading();

    return this.http.post<any>(`${INCCA_WEB_URL}/basico/saveImages`, JSON.stringify({ Image }))
      .pipe(
        tap({
          next: value => {
            this.loadingService.hideLoading();
          },
          error: error => {
            catchError(this.handleError),
              this.loadingService.hideLoading();
          }
        }));
  }

  public getAll(state: State, queryId?: any): Observable<GridDataResult> {

    console.log("loading imagen");
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    this.loadingService.showLoading();
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?ProdutoId=${queryId}&${query}`).pipe(
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          catchError(this.handleError),
            this.loadingService.hideLoading();
        }
      }),
      catchError(this.handleError),
    );
  }

  public autoNumberOrdemImagem(ProdutoId?: string): Observable<{ contador: number }> {

    return this.http.post<any>(`${INCCA_WEB_URL}/basico/autoNumberOrdemImagem`, JSON.stringify({ ProdutoId }))
      .pipe(map(res => res));
  }



}

import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { VariacaoImagem } from './variacao-imagem.model';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from 'src/app/shared/services/api.inccaWeb';
import { tap, map, catchError } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';
import { Help } from 'src/app/shared/models/help.model';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})
export class VariacaoImagemService extends BaseRecursoService<VariacaoImagem> {

  public state: State
  httpClient: any;
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/VariacoesImagem`, `${INCCA_WEB_URL}/basico/VariacaoImagem`,
      injector,
      VariacaoImagem.fromJson);
  }

  public postFile(Imagem:string ,TypeImage:string,NomeImagem?:string): Observable<any> {
    let Image = {
      Imagem,
      TypeImage,
      NomeImagem
    }

    console.log(Image);
    return this.http.post<any>(`${INCCA_WEB_URL}/basico/saveImages`, JSON.stringify({Image}),  )
    .pipe(map(res => res.resultString))
  }

  getAll(state: State, queryId?:any): Observable<GridDataResult> {
    console.log(queryId);
    let query = ''
    if (state) {
      query = this.createQuery(state)
    }
    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?VariacaoId=${queryId}&${query}`,  ).pipe(
      catchError(this.handleError)
    );
  }

}

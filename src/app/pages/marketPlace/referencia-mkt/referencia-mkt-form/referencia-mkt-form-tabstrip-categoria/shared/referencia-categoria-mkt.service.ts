import { Injectable, Injector } from '@angular/core';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { ReferenciaMktCategoria } from '../../../shared/referencia-categoria-mkt.model';

@Injectable({
  providedIn: 'root'
})

export class CategoriaMktService extends BaseRecursoService<ReferenciaMktCategoria> {

  public dataSource = new BehaviorSubject<string>('') //Behavior subject para informar que a referencia mkt categoria foi cadastrada
  public data = this.dataSource.asObservable()

  public state: State
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/marketplace/ReferenciaMktCategorias`, `${INCCA_WEB_URL}/marketplace/ReferenciaMktCategoria`,
      injector,
      ReferenciaMktCategoria.fromJson);
  }

  getAllCategoriasPai(nomeMkt: string): Observable<GridDataResult> {
    return this.http.get<GridDataResult>(`${INCCA_WEB_URL}/marketplace/CategoriasPorMktSemPais?MktPlaceId=${nomeMkt}`).pipe(
        catchError(this.handleError)
    );
  }
}
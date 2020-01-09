import { Injectable, Injector } from '@angular/core';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { BaseRecursoService } from 'src/app/shared/services/base-recurso.service';
import { State } from '@progress/kendo-data-query';
import { Categoria } from 'src/app/pages/marketPlace/categoria/shared/categoria.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GridDataResult } from '@progress/kendo-angular-grid';

@Injectable({
  providedIn: 'root'
})

export class CategoriaService extends BaseRecursoService<Categoria> {
  public dataSource = new BehaviorSubject<string>('') //Behavior subject para passar CategoriaPaiId
  public data = this.dataSource.asObservable()

  public dataSourceId = new BehaviorSubject<string>('')
  public dataId = this.dataSourceId.asObservable()
  public loading: boolean = false
  public categoriaPaiId
  public dadosCategoria: any;
  public state: State
  constructor(protected injector: Injector
  ) {
    super(`${INCCA_WEB_URL}/marketplace/categorias`, `${INCCA_WEB_URL}/marketplace/categoria`,
      injector,
      Categoria.fromJson);
  }

  public save(data: Categoria, isNew?: boolean) {
    if (isNew) {
      return this.create(data).subscribe((res) => {
        this.dataSourceId.next(res.CategoriaId)
        this.read(this.state, this.queryId)
      })
    } else {
      return this.getById(data.id).subscribe((res) => {
        data.gx_md5_hash = res.gx_md5_hash;
        data.id = res.id
        this.update(data).subscribe((res) => {
          this.dataSource.next(res.CategoriaPaiId)
        })
      })
    }
  }

  reinicializaSubject() {
    this.dataSourceId.next('')
    this.dataSource.next('')
  }

  getAll(state?: State, queryId?: any, mktPlaceId?: string, CategoriaPaiId?: string): Observable<GridDataResult> {

    if (mktPlaceId === undefined)
      mktPlaceId = ''

    if (!queryId) {
      queryId = '00000000-0000-0000-0000-000000000000'
    }

    if (!CategoriaPaiId) {
      CategoriaPaiId = '00000000-0000-0000-0000-000000000000'
    }

    let query = ''
    if (state) {
      query = this.createQuery(state)
    }

    console.log(query);

    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?CategoriaId=${queryId}&${query}&MktPlaceId=${mktPlaceId}&CategoriaPaiId=${CategoriaPaiId}`).pipe(
      catchError(this.handleError)
    );
  }
}

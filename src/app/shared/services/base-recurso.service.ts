import { BaseResourceModel } from '../models/base-resource.model';
import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { INCCA_WEB_URL } from './api.inccaWeb';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { State, toDataSourceRequestString } from '@progress/kendo-data-query';
import { Help } from '../models/help.model';
import { LoadingService } from './loading.service';

export abstract class BaseRecursoService<T extends BaseResourceModel> extends BehaviorSubject<GridDataResult> {

  protected http: HttpClient;
  protected loadingService: LoadingService;
  protected dataListSource: BehaviorSubject<T[]>;
  public loading = true;
  public state: State;
  public queryId: any;

  constructor(
    protected apiPathGetAll: string,
    protected apiPathCRUD: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ) {
    super(null);
    this.http = injector.get(HttpClient);
    this.loadingService = injector.get(LoadingService);
    this.dataListSource = new BehaviorSubject([]);
  }

  public read(state?: State, queryId?: any) {
    this.queryId = queryId;
    this.state = state;
    this.getAll(state, queryId).pipe(tap(() => this.loading = false)).subscribe(res => {
      if (res.data) {
        super.next(res);
      } else {
        super.next({ total: 0, data: [] });
      }
    });
  }

  public save(data: T, isNew?: boolean) {
    //   console.log(isNew, data);
    if (isNew) {
      this.create(data).subscribe(() => this.read(this.state, this.queryId));
    } else {
      this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash
        this.update(data).subscribe(() => this.read(this.state, this.queryId));
      })).subscribe(() => this.read(this.state, this.queryId));
    }
  }

  public remove(data: any) {
    this.delete(data.id)
      .subscribe(() => this.read(this.state, this.queryId), (erro) => { throw erro; });
  }

  public getHelp(seguimento: string, tela: string): Observable<Help[]> {
    const body = { Seguimento: seguimento, HelpTelaString: tela };
    return this.http.post<any>(`${INCCA_WEB_URL}/GetHelp`, JSON.stringify(body))
      .pipe(map(data => data.HelpCollection));
  }

  getDataList(): Observable<T[]> {
    return this.http.get(this.apiPathGetAll).pipe(
      map(res => {
        this.dataListSource.next(this.jsonDataToResources.bind(this));
      }),
      catchError(this.handleError)
    );
  }

  getAll(state?: State, queryId?: any): Observable<GridDataResult> {

    this.loadingService.showLoading();
    let query = '';
    if (state) {
      query = this.createQuery(state);
    }

    return this.http.get<GridDataResult>(`${this.apiPathGetAll}?${query}`).pipe(
      catchError(this.handleError),
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          catchError(this.handleError),
            this.loadingService.hideLoading();
        }
      })
    );
  }

  getById(id: string): Observable<T> {
    const url = `${this.apiPathCRUD}/${id}`;
    return this.watch(this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError))
    );
  }

  create(resource: T): Observable<T> {
    const url = `${this.apiPathCRUD}/0`;
    return this.watch(this.http.post(url, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError))
    );
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPathCRUD}/${resource.id} `;
    return this.watch(this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError))
    );
  }


  delete(id: string): Observable<any> {
    const url = `${this.apiPathCRUD}/${id}`;
    return this.watch(this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    ));
  }

  private watch(response: Observable<T>): Observable<T> {

    this.loadingService.showLoading();

    return response.pipe(
      tap({
        next: value => {
          this.loadingService.hideLoading();
        },
        error: error => {
          //faça aqui seu tratamento de erro
          this.loadingService.hideLoading();
        }
      })
    );
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push(this.jsonDataToResourceFn(element))
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any> {
    // console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }

  public createQuery(state: State): string {
    const query2 = toDataSourceRequestString(state);

    // console.log(query2);
    // const query = toDataSourceRequestString(state)
    //   .replace(/filter=/g, '')
    //   .replace(/page/, 'pageNumber') // sem o g troca o primeiro page que encontrar
    //   .replace(/[()]/g, '')
    //   .replace(/~contains~/g, '=')
    //   .replace(/[\\']/g, '')
    //   .replace(/~or~/g, '&');
    // // query.replace(/filter=/g,'')
    return query2;
  }
}

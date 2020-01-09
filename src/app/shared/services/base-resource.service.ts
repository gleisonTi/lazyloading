import { BaseResourceModel } from '../models/base-resource.model';

import { Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { State } from '@progress/kendo-data-query';
import { INCCA_WEB_URL,   } from './api.inccaWeb';
import { Help } from '../models/help.model';
import { GridDataResult } from '@progress/kendo-angular-grid';

export abstract class BaseResourceService<T extends BaseResourceModel> extends BehaviorSubject<GridDataResult>{

  protected http: HttpClient;
  public state: State

  constructor(
    protected apiPath: string,
    protected injector: Injector,
    protected jsonDataToResourceFn: (jsonData: any) => T
  ){
    super(null)
    this.http = injector.get(HttpClient);
  }


  public read(state?: State) {
    this.state = state
    this.getAll(state).subscribe(res => super.next(res))
  }

  public save(data: T, isNew?: boolean) {
    if (isNew) {
      return this.create(data).subscribe(()=> this.read(this.state))
    } else {
       this.getById(data.id).pipe(tap(res => {
        data.gx_md5_hash = res.gx_md5_hash
        data.id = res.id
        this.update(data).subscribe(()=> this.read(this.state))
      })
      )
    }
  }

  public remove(data:T) {
    console.log(data);
    this.delete(data.id)
      .subscribe(() => this.read(this.state), (erro) => { throw erro });
  }

  public getHelp(seguimento: string, tela: string): Observable<Help[]> {
    const body = { Seguimento: seguimento, HelpTelaString: tela }
    return this.http.post<any>(`${INCCA_WEB_URL}/GetHelp`,JSON.stringify(body),  )
    .pipe(map(data => data.HelpCollection))
  }

  getAll(state: State): Observable<GridDataResult> {
    return this.http.get(this.apiPath).pipe(
      map(this.jsonDataToResources.bind(this)),
      catchError(this.handleError)
    )
  }

  getById(id: string): Observable<T> {
    const url = `${this.apiPath}/${id}`;

    return this.http.get(url).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  create(resource: T): Observable<T> {
    return this.http.post(this.apiPath, resource).pipe(
      map(this.jsonDataToResource.bind(this)),
      catchError(this.handleError)
    )
  }

  update(resource: T): Observable<T> {
    const url = `${this.apiPath}/${resource.id}`;

    return this.http.put(url, resource).pipe(
      map(() => resource),
      catchError(this.handleError)
    )
  }

  delete(id: string): Observable<any> {
    const url = `${this.apiPath}/${id}`;

    return this.http.delete(url).pipe(
      map(() => null),
      catchError(this.handleError)
    )
  }

  // PROTECTED METHODS

  protected jsonDataToResources(jsonData: any[]): T[] {
    const resources: T[] = [];
    jsonData.forEach(
      element => resources.push( this.jsonDataToResourceFn(element) )
    );
    return resources;
  }

  protected jsonDataToResource(jsonData: any): T {
    return this.jsonDataToResourceFn(jsonData);
  }

  protected handleError(error: any): Observable<any>{
    console.log('ERRO NA REQUISIÇÃO => ', error);
    return throwError(error);
  }

}

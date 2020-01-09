import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { User, AcessToken } from './User';
import { CLIENT_ID } from 'src/app/shared/services/api.inccaWeb';
import { GlobalService } from 'src/app/shared/services/global.sevice';
import { Empresa } from '../components/registrar/shared/empresa.model';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private globalService: GlobalService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  verificaCadastrouEmpresa() {
    return this.http.post(INCCA_WEB_URL + '/autenticacao/verificaCadastrouEmpresa', {})
  }

  registrar(empresa: Empresa) {
    return this.http.post(INCCA_WEB_URL + '/autenticacao/registraempresa', { Empresa: empresa })
  }

  verificaAlteracaoSenhaAdministrador() {
    return this.http.post(INCCA_WEB_URL + '/autenticacao/verificaAlteracaoSenhaAdministrador', {})
  }

  alteraSenhaAdministrador(senhaAdministrador: string) {
    return this.http.post(INCCA_WEB_URL + '/autenticacao/alteraSenhaAdministrador', {
      UsuarioSenha: senhaAdministrador
    })
  }

  login(username: string, password: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = `client_id=${CLIENT_ID}&grant_type=password&scope=FullControl&username=${username}&password=${password}`

    return this.http.post<AcessToken>(`http://localhost:4200/api/InccaWeb.NetEnvironment/oauth/access_token`, body, { headers })
      // return this.http.post<AcessToken>(`http://10.0.0.114/InccaWeb.NetEnvironment/oauth/access_token`, body, { headers })
      .pipe(tap(res => console.log(res)))
      .pipe(map(acessToken => {
        // login successful if there's a jwt token in the response
        let user = new User
        user.id = acessToken.user_guid;
        user.token = acessToken.access_token;
        if (user && user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          //this.getSeguimento("AutoPecas")
        }
        return user;
      }
      ));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    localStorage.removeItem('helpers');
    this.currentUserSubject.next(null);
  }

  getSeguimento(seg: string) {
    this.globalService.getSeguimentos().subscribe(res => {
      let seguimento = res.find(item => item.Seguimento === seg).Seguimento
      if (seguimento) {
        localStorage.setItem('Seguimento', seguimento);
      } else {
        console.log('seguimento não encontrado');
      }
    });
  }
}

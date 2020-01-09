import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable()

//Interceptor que adiciona o token no header de todas as requisições após o login

export class TokenIncerceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler,
    ): Observable<HttpEvent<any>> {
        //Se tiver token guardado no localstorage adiciona os headers necessários pós login
        if(localStorage.getItem('currentUser')){
            var USUARIO = JSON.parse(localStorage.getItem('currentUser'));
            const TOKEN = USUARIO.token;
            req = req.clone({ headers: req.headers.set('Authorization', TOKEN) });
            req = req.clone({ headers: req.headers.set('Accept', 'application/json') })
            req = req.clone({ headers: req.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, post-check=0, pre-check=0') })
            req = req.clone({ headers: req.headers.set('Pragma', 'no-cache') })
            req = req.clone({ headers: req.headers.set('Expires', '0') })
        }else{
        //Caso não tenha token guardado no localstorage aplica o header necessário pré login
            const TOKEN = ""
            req = req.clone({ headers: req.headers.set('Accept', 'application/x-www-form-urlencoded') })
        }

        //Aplica o header de content-type em ambos os casos
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        return next.handle(req)
    
    }
}


@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenIncerceptor,
            multi: true,
        },
    ],
})


export class Interceptor { }
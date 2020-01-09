import { CategoriaBannerSubmenu } from './../categoria-form/categoria-banner-submenu/shared/categoria-banner-submenu.model';
import { CategoriaBanner } from './../categoria-form/categoria-imagem-banner/shared/categoria-imagem-banner.model';
import { CategoriaIcone } from './../categoria-form/categoria-imagem-icone/shared/categoria-imagem-icone.model';
import { HttpClient } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Observable, Subject } from 'rxjs';
import * as Rx from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CategoriaImagemService {

    urlImageSelect: string
    base64textString: string

    httpClient: any;
    constructor(protected injector: Injector,
                public http: HttpClient
    ) {}

    public postFile(ImageIcone: CategoriaIcone, ImageBanner: CategoriaBanner, ImageSubmenu: CategoriaBannerSubmenu): Observable<any> {
      return this.http.post<any>(`${INCCA_WEB_URL}/basico/saveImagesCategoria`, JSON.stringify({ImageIcone, ImageBanner, ImageSubmenu}))
    }

    public verificaSePossuiExtensao(nomeImagem: string){ //Função que retira a extensão da foto para mostrar no textbox apenas o nome da foto.
      let nameImage = nomeImagem.split(".")[0];
      return nameImage;
    }
}
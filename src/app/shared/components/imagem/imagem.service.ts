import { Injectable, Injector } from '@angular/core';
import { BaseRecursoService } from '../../services/base-recurso.service';
import { INCCA_WEB_URL,   } from '../../services/api.inccaWeb';
import { Observable } from 'rxjs';
import { Imagem } from '../../models/image.model';

@Injectable({
  providedIn: 'root'
})
export class ImagemService extends BaseRecursoService<Imagem> {
  constructor(protected injector: Injector) {
    super(`${INCCA_WEB_URL}/basico/Imagens`, `${INCCA_WEB_URL}/basico/imagem`,
      injector,
      Imagem.fromJson);

  }

  public postFile(fileToUpload: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('Image', fileToUpload);
    return this.http.post(`${INCCA_WEB_URL}/basico/saveImages`, formData,  )
  }

}

import { NgModule, Injector } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaRoutingModule } from './categoria-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CategoriaGridComponent } from './categoria-grid/categoria-grid.component';
import { CategoriaService } from './shared/categoria.service';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { CategoriaImagemIconeComponent } from './categoria-form/categoria-imagem-icone/categoria-imagem-icone.component';
import { CategoriaImagemBannerComponent } from './categoria-form/categoria-imagem-banner/categoria-imagem-banner.component';
import { CategoriaImagemBannerSubmenu } from './categoria-form/categoria-banner-submenu/categoria-banner-submenu.component';
import { CategoriaImagemService } from './shared/categoriaImagens.service';
import { SubCategoriaGridComponent } from './sub-categoria-grid/sub-categoria-grid.component';

@NgModule({
  declarations: [
    CategoriaGridComponent,
    CategoriaFormComponent,
    CategoriaImagemIconeComponent,
    CategoriaImagemBannerComponent,
    CategoriaImagemBannerSubmenu,
    SubCategoriaGridComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CategoriaRoutingModule,
  ],
  providers:[
    CategoriaImagemService,
    {
    deps: [Injector],
    provide: CategoriaService,
    useFactory: (injector: Injector) => () => new CategoriaService(injector)
  }]
})
export class CategoriaModule { }

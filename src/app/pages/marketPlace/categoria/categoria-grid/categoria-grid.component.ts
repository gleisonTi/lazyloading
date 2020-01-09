import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/pages/marketPlace/categoria/shared/categoria.model';
import { CategoriaService } from './../shared/categoria.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { State } from '@progress/kendo-data-query';

const createFormGroup = (dataItem?: Categoria) => {
  if (dataItem) {
    return new FormGroup({
      CategoriaId: new FormControl(dataItem.CategoriaId),
      CategoriaNome: new FormControl(dataItem.CategoriaNome, Validators.required),
      CategoriaDescricao: new FormControl(dataItem.CategoriaDescricao),
      CategoriaTitulo: new FormControl(dataItem.CategoriaTitulo),
      CategoriaMetaDescricao: new FormControl(dataItem.CategoriaMetaDescricao),
      CategoriaPalavraChave: new FormControl(dataItem.CategoriaPalavraChave),
      CategoriaHabilitado: new FormControl(dataItem.CategoriaHabilitado),
      CategoriaIcone: new FormControl(dataItem.CategoriaIcone),
      CategoriaBanner: new FormControl(dataItem.CategoriaBanner),
      CategoriaImagemSubmenu: new FormControl(dataItem.CategoriaImagemSubmenu),
      CategoriaIdMktPlace: new FormControl(dataItem.CategoriaIdMktPlace),
      CategoriaUsuario: new FormControl(dataItem.CategoriaUsuario),
      CategoriaData: new FormControl(dataItem.CategoriaData),
      CategoriaPaiId: new FormControl(dataItem.CategoriaPaiId),
      CategoriaExibir: new FormControl(dataItem.CategoriaExibir),
      CategoriaExibirInformativo: new FormControl(dataItem.CategoriaExibirInformativo),
      CategoriaRetirarLink: new FormControl(dataItem.CategoriaExibirInformativo),
      CategoriaColunas: new FormControl(dataItem.CategoriaColunas, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaOrdem: new FormControl(dataItem.CategoriaOrdem, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaInativo: new FormControl(dataItem.CategoriaInativo),
      CategoriaExLateral: new FormControl(dataItem.CategoriaExLateral),
      CategoriaEstoque: new FormControl(dataItem.CategoriaEstoque),
      MktPlaceId: new FormControl(dataItem.MktPlaceId),
      ImageIcone: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl(''),
      }),
      ImageBanner: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl('')
      }),
      ImageSubmenu: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl('')
      })
    }
    );
  } else {
    return new FormGroup({
      CategoriaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      CategoriaPaiId: new FormControl('00000000-0000-0000-0000-000000000000'),
      MktPlaceId: new FormControl(''),
      CategoriaNome: new FormControl('', Validators.required),
      CategoriaDescricao: new FormControl(''),
      CategoriaTitulo: new FormControl(''),
      CategoriaMetaDescricao: new FormControl(''),
      CategoriaPalavraChave: new FormControl(''),
      CategoriaHabilitado: new FormControl(false),
      CategoriaIcone: new FormControl(''),
      CategoriaBanner: new FormControl(''),
      CategoriaImagemSubmenu: new FormControl(''),
      CategoriaIdMktPlace: new FormControl(''),
      CategoriaExibir: new FormControl(false),
      CategoriaExibirInformativo: new FormControl(false),
      CategoriaRetirarLink: new FormControl(false),
      CategoriaColunas: new FormControl(null, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaOrdem: new FormControl(null, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaInativo: new FormControl(false),
      CategoriaExLateral: new FormControl(false),
      CategoriaEstoque: new FormControl(false),
      ImageIcone: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl('')
      }),
      ImageBanner: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl('')
      }),
      ImageSubmenu: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl('')
      })
    });
  }
};

@Component({
  selector: 'incca-categoria-grid',
  templateUrl: './categoria-grid.component.html',
  styleUrls: ['./categoria-grid.component.scss']
})
export class CategoriaGridComponent extends BaseResourceGridComponent<Categoria> implements OnInit {

  public categoriaList: Categoria[] = []; //Copula o select de categoria pai
  public createFormGroup: FormGroup;
  public openedCadCategoria = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: 'CategoriaNome', title: 'Categoria' },
    { field: 'CategoriaSubCategoriaNome', title: 'Subcategoria' },
    { field: 'CategoriaInativo', title: 'Inativo' }
  ];
  constructor(
    protected injector: Injector,
    @Inject(CategoriaService) editServiceFactory: any,
    public categoriaService: CategoriaService
  ) {
    super(injector, new Categoria(), categoriaService = editServiceFactory() , createFormGroup);
  }

  updateGrid(e){
    this.resourceService.read(this.gridState)
  }

  ngOnInit() {

    super.ngOnInit();
    this.categoriaService.data.subscribe((res) => {
      this.resourceService.read(this.gridState);
    })

    this.categoriaService.dataId.subscribe((res) => {
      this.resourceService.read(this.gridState)
    })

  }

  public removeHandler({ dataItem }){
    this.resource = Categoria.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public close(){
    this.openedCadCategoria = false;
  }

  public open({ isNew, dataItem }){
    if(dataItem){
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew // passado como parâmetro para o form de categoria
    this.openedCadCategoria = true;
  }

  public onStateChange(state: State) {
    this.gridState = state;
    this.categoriaService.read(this.gridState, '00000000-0000-0000-0000-000000000000');
  }

  public getValueCheckbox(dataItem: Categoria, col: string): boolean{
    switch (col){
      case "CategoriaHabilitado": return dataItem.CategoriaHabilitado
      case "CategoriaExibir": return dataItem.CategoriaExibir
      case "CategoriaExibirInformativo": return dataItem.CategoriaExibirInformativo
      case "CategoriaRetirarLink": return dataItem.CategoriaRetirarLink
      case "CategoriaInativo": return dataItem.CategoriaInativo
      case "CategoriaExLateral": return dataItem.CategoriaExLateral
      case "CategoriaEstoque": return dataItem.CategoriaEstoque
    }
  }
}
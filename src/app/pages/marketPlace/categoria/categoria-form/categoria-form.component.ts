import { Component, OnInit, Input, OnDestroy, ViewEncapsulation, Injectable, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Categoria } from 'src/app/pages/marketPlace/categoria/shared/categoria.model';
import { CategoriaService } from './../shared/categoria.service';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { CategoriaImagemService } from './../shared/categoriaImagens.service';
import * as marketPlaceList from './../../../../shared/escritas/palavras';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

@Component({
  selector: 'incca-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class CategoriaFormComponent implements OnInit, OnDestroy {

  dataCategoria: Categoria[]
  public subscription: Subscription;
  @Input() public categoriaService: CategoriaService
  public urlImageSelectSubmenu: any = ''
  public urlImageSelectBanner: any = ''
  public isitemSelected: boolean = false
  public urlImage: string
  public urlImageSelectIcone: any = ''
  public base64textString: string = ''
  public semImagem: string;
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/')
  public fileToUpload: File = null
  public nameImage: string
  public inativo = false;
  public CategoriaList: Categoria[];
  public mktList = marketPlaceList.marketPlaces
  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  @Output() public updateGrid = new EventEmitter<any>()
  @Output() public updateSubGrid = new EventEmitter<any>()
  public created = false;
  public categoria: Categoria

  constructor(
    public categoriaImagemService: CategoriaImagemService,
    private sanitizer: DomSanitizer
  ) { this.semImagem = "../../../../../assets/img/utils/sem_imagem.jpg" }

  ngOnInit() {

    if (this.formGroup.get('CategoriaId').value !== '00000000-0000-0000-0000-000000000000') {
      this.isNew = false;
    }

    this.categoriaService.data.subscribe((res) => { //Recebe o categoria pai id e mostra mensagem de sucesso de alteração
      if(res !== ''){
        this.created = true;
        this.isNew = false
      }else{
        this.created = false;
      }
    })

    this.subscription = this.categoriaService.dataId.subscribe((res) => { //Recebe o categoria id e mostra mensagem de sucesso de criação
      if (res !== '') {
        this.formGroup.get('CategoriaId').setValue(res)
        this.created = true;
        this.isNew = false;
      }else{
        this.created = false;
      }
    })

    if (this.formGroup.get('CategoriaIcone').value !== '') {
      this.urlImageSelectIcone = this.sanitizer.bypassSecurityTrustUrl(this.baseUrl + 'Categorias/Icones/' + this.formGroup.get('CategoriaIcone').value)
      let nomeIconeSemExtensao = this.categoriaImagemService.verificaSePossuiExtensao(this.formGroup.get('CategoriaIcone').value)
      this.formGroup.get('ImageIcone').get('NomeImagem').setValue(nomeIconeSemExtensao)
    }

    if (this.formGroup.get('CategoriaBanner').value !== '') {
      this.urlImageSelectBanner = this.sanitizer.bypassSecurityTrustUrl(this.baseUrl + 'Categorias/Banners/' + this.formGroup.get('CategoriaBanner').value)
      let nomeIconeSemExtensao = this.categoriaImagemService.verificaSePossuiExtensao(this.formGroup.get('CategoriaBanner').value)
      this.formGroup.get('ImageBanner').get('NomeImagem').setValue(nomeIconeSemExtensao)
    }

    if (this.formGroup.get('CategoriaImagemSubmenu').value !== '') {
      this.urlImageSelectSubmenu = this.sanitizer.bypassSecurityTrustUrl(this.baseUrl + 'Categorias/SubMenus/' + this.formGroup.get('CategoriaImagemSubmenu').value)
      let nomeIconeSemExtensao = this.categoriaImagemService.verificaSePossuiExtensao(this.formGroup.get('CategoriaImagemSubmenu').value)
      this.formGroup.get('ImageSubmenu').get('NomeImagem').setValue(nomeIconeSemExtensao)
    }

  }

  public atualizaCategorias(){
    this.categoriaService.getAll(null, this.formGroup.get('CategoriaId').value, this.formGroup.get('MktPlaceId').value).subscribe(res => { this.CategoriaList = res.data; this.dataCategoria = res.data; });
  }

  public getUrlIconeCategoria(): string {
    if (this.urlImageSelectIcone !== '') {
      return this.urlImageSelectIcone.changingThisBreaksApplicationSecurity
    }
    else if (this.formGroup.get('ImageIcone').get('Imagem').value !== '') {
      return this.formGroup.get('ImageIcone').get('Imagem').value
    } else {
      return this.semImagem
    }
  }

  public getUrlIconeBanner(): string {
    if (this.urlImageSelectBanner !== '') {
      return this.urlImageSelectBanner.changingThisBreaksApplicationSecurity
    }
    else if (this.formGroup.get('ImageBanner').get('Imagem').value !== '') {
      return this.formGroup.get('ImageBanner').get('Imagem').value
    } else {
      return this.semImagem
    }
  }

  public getUrlIconeSubmenu(): string {
    if (this.urlImageSelectSubmenu !== '') {
      return this.urlImageSelectSubmenu.changingThisBreaksApplicationSecurity
    }
    else if (this.formGroup.get('ImageSubmenu').get('Imagem').value !== '') {
      return this.formGroup.get('ImageSubmenu').get('Imagem').value
    } else {
      return this.semImagem
    }
  }

  public _handleReaderBitMapIcone(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    let base64 = JSON.parse(JSON.stringify(this.base64textString))
    this.urlImageSelectIcone = this.sanitizer.bypassSecurityTrustUrl('data:image/' + this.formGroup.get('ImageIcone').get('TypeImage').value + ';base64,' + base64)
    this.formGroup.get('ImageIcone').get('Imagem').setValue(base64)
  }

  public getImageEventIcone(file: FileList) {
    if (file && file.item(0)) {
      var reader = new FileReader();
      var readerbit = new FileReader();
      readerbit.onload = this._handleReaderBitMapIcone.bind(this);
      readerbit.readAsBinaryString(file.item(0));
      reader.readAsDataURL(file.item(0))
      this.fileToUpload = file.item(0)
      this.nameImage = this.fileToUpload.name
      this.nameImage = this.categoriaImagemService.verificaSePossuiExtensao(this.nameImage)
      this.formGroup.get('ImageIcone').get('NomeImagem').setValue(this.nameImage) //Passa o valor para o formgroup para posteriormente alterar no textbox
      this.formGroup.get('ImageIcone').get('TypeImage').setValue(file.item(0).type.replace("image/", ""))
    }
  }

  public getImageEventBanner(file: FileList) {
    if (file && file.item(0)) {
      var reader = new FileReader();
      var readerbit = new FileReader();
      readerbit.onload = this._handleReaderBitMapBanner.bind(this);
      readerbit.readAsBinaryString(file.item(0));
      reader.readAsDataURL(file.item(0))
      this.fileToUpload = file.item(0)
      let nameImage = this.fileToUpload.name
      nameImage = this.categoriaImagemService.verificaSePossuiExtensao(nameImage)
      this.formGroup.get('ImageBanner').get('NomeImagem').setValue(nameImage) //Passa o valor para o formgroup para posteriormente alterar no textbox
      this.formGroup.get('ImageBanner').get('TypeImage').setValue(file.item(0).type.replace("image/", ""))
    }
  }

  public _handleReaderBitMapBanner(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    let base64 = JSON.parse(JSON.stringify(this.base64textString))
    this.urlImageSelectBanner = this.sanitizer.bypassSecurityTrustUrl('data:image/' + this.formGroup.get('ImageBanner').get('TypeImage').value + ';base64,' + base64)
    this.formGroup.get('ImageBanner').get('Imagem').setValue(base64)
  }

  public getImageEventSubmenu(file: FileList) {
    if (file && file.item(0)) {
      var reader = new FileReader();
      var readerbit = new FileReader();
      readerbit.onload = this._handleReaderBitMapSubmenu.bind(this);
      readerbit.readAsBinaryString(file.item(0));
      reader.readAsDataURL(file.item(0))
      this.fileToUpload = file.item(0)
      this.nameImage = this.fileToUpload.name
      this.nameImage = this.categoriaImagemService.verificaSePossuiExtensao(this.nameImage)
      this.formGroup.get('ImageSubmenu').get('NomeImagem').setValue(this.nameImage) //Passa o valor para o formgroup para posteriormente alterar no textbox
      this.formGroup.get('ImageSubmenu').get('TypeImage').setValue(file.item(0).type.replace("image/", ""))
    }
  }

  public _handleReaderBitMapSubmenu(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    let base64 = JSON.parse(JSON.stringify(this.base64textString))
    this.urlImageSelectSubmenu = this.sanitizer.bypassSecurityTrustUrl('data:image/' + this.formGroup.get('ImageSubmenu').get('TypeImage').value + ';base64,' + base64)
    this.formGroup.get('ImageSubmenu').get('Imagem').setValue(base64)
  }

  ngOnDestroy() {
    this.created = false;
    this.formGroup = createFormGroup();
    this.categoriaService.reinicializaSubject()
  }

  handleFilterCategoria(e) {
    this.CategoriaList = this.dataCategoria.filter((item) =>
      item.CategoriaNome.toLowerCase().indexOf(e.toLowerCase()) !== -1);
  }

  salvarDados() {
    //Primeiro salva as imagens no servidor do usuário:
    this.categoriaImagemService.postFile(this.formGroup.get('ImageIcone').value,
      this.formGroup.get('ImageBanner').value,
      this.formGroup.get('ImageSubmenu').value
    )
      .subscribe(res => {
        if(res.ResultadoIcone !== '')
          this.formGroup.get('CategoriaIcone').setValue(res.ResultadoIcone)
        if(res.ResultadoBanner !== null)
          this.formGroup.get('CategoriaBanner').setValue(res.ResultadoBanner)
        if(res.ResultadoSubMenu !== null)
          this.formGroup.get('CategoriaImagemSubmenu').setValue(res.ResultadoSubMenu)
        //Salva no banco de dados os dados da categoria
        const referencia: Categoria = Categoria.fromJson(this.formGroup.value);
        this.categoriaService.save(referencia, this.isNew)
      }
    )
  }
}

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
      CategoriaRetirarLink: new FormControl(dataItem.CategoriaRetirarLink),
      CategoriaColunas: new FormControl(dataItem.CategoriaColunas, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaOrdem: new FormControl(dataItem.CategoriaOrdem, [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaInativo: new FormControl(dataItem.CategoriaInativo),
      CategoriaExLateral: new FormControl(dataItem.CategoriaExLateral),
      CategoriaEstoque: new FormControl(dataItem.CategoriaEstoque),
      MktPlaceId: new FormControl(dataItem.MktPlaceId),
      CategoriaImagemIcone: new FormControl(''),
      ImageIcone: new FormGroup({
        Imagem: new FormControl(''),
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl('')
      }),
      ImageBanner: new FormGroup({
        Imagem: new FormControl(''),
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl('')
      }),
      ImageSubmenu: new FormGroup({
        Imagem: new FormControl(''),
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl('')
      })
    })
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
      CategoriaUsuario: new FormControl(''),
      CategoriaImagemSubmenu: new FormControl(''),
      CategoriaIdMktPlace: new FormControl(''),
      CategoriaExibir: new FormControl(false),
      CategoriaExibirInformativo: new FormControl(false),
      CategoriaRetirarLink: new FormControl(false),
      CategoriaColunas: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaOrdem: new FormControl('', [Validators.pattern(/^-?([0-9]\d*)?$/)]),
      CategoriaInativo: new FormControl(false),
      CategoriaExLateral: new FormControl(false),
      CategoriaEstoque: new FormControl(false),
      CategoriaData: new FormControl(''),
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
        UrlImagemIcone: new FormControl(''),
      }),
      ImageSubmenu: new FormGroup({
        NomeImagem: new FormControl(''),
        TypeImage: new FormControl(''),
        Imagem: new FormControl(''),
        UrlImagemIcone: new FormControl(''),
      })

    });
  }
}
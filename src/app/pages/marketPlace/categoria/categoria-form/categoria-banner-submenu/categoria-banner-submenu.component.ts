import { CategoriaImagemService } from './../../shared/categoriaImagens.service';
import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { CategoriaBannerSubmenu } from './shared/categoria-banner-submenu.model';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';

let createFormGroup = (dataItem?: CategoriaBannerSubmenu) => {
    if (dataItem) {
        return new FormGroup({
        'NomeImagem': new FormControl(dataItem.NomeImagem),
        'Imagem': new FormControl(dataItem.Imagem),
        'UrlImagemIcone': new FormControl(dataItem.UrlImagemIcone),
        'TypeImage': new FormControl('')
        });
    } else {
        return new FormGroup({
        'NomeImagem': new FormControl(''),
        'Imagem': new FormControl(''),
        'UrlImagemIcone': new FormControl(''),
        'TypeImage': new FormControl('')
        });
    }
}

@Component({
  selector: 'incca-categoria-banner-submenu',
  templateUrl: './categoria-banner-submenu.component.html',
  styleUrls: ['./categoria-banner-submenu.component.scss'],
})

export class CategoriaImagemBannerSubmenu implements OnInit {

  @Output() onChangeImageSubMenu = new EventEmitter()
  @Input() iconeCaminho: string;
  @Input() categoriaDataItem: CategoriaBannerSubmenu
  formGroup: FormGroup
  public isitemSelected: boolean = false
  public urlImage: string
  public urlImageSelect: string = ''
  public base64textString: string = ''
  public fileToUpload: File = null
  public nameImage: string
  public openedImagem: boolean = false
  public semImagem = "../../../../../../assets/img/utils/sem_imagem.jpg"
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/Categorias/SubMenus/')

  constructor(public categoriaImagemService: CategoriaImagemService) {
  }

  ngOnInit() {
    this.formGroup = createFormGroup()
    if(this.iconeCaminho){
      this.urlImageSelect = this.baseUrl + this.iconeCaminho
      this.iconeCaminho = this.categoriaImagemService.verificaSePossuiExtensao(this.iconeCaminho)
      this.formGroup.get('NomeImagem').setValue(this.iconeCaminho)
    }
  }

  ngOnDestroy(): void {
    this.formGroup = createFormGroup();
  }

  public close() {
    this.openedImagem = false
  }

  public openImage() {
    this.openedImagem = true
  }

  public getNameImagem(urlName: string): string {
    return urlName.replace("ArquivosUpload", "")
  }

  public getUrlBannerSubmenuCategoria(): string {
    if (this.urlImageSelect !== '') {
      return this.urlImageSelect
    } else {
      return this.semImagem
    }
  }

  public getImageEvent(file: FileList) {
    if (file && file.item(0)) {
      var reader = new FileReader();
      var readerbit = new FileReader();
      readerbit.onload = this._handleReaderBitMap.bind(this);
      reader.onload = this._handleReaderUrl.bind(this);
      readerbit.readAsBinaryString(file.item(0));
      reader.readAsDataURL(file.item(0))
      this.fileToUpload = file.item(0)
      this.nameImage = this.fileToUpload.name
      this.nameImage = this.categoriaImagemService.verificaSePossuiExtensao(this.nameImage)
      this.formGroup.get('NomeImagem').setValue(this.nameImage) //Passa o valor para o formgroup para posteriormente alterar no textbox
      this.formGroup.get('TypeImage').setValue(file.item(0).type.replace("image/", ""))
      this.emiteFormComponentePai()
    }
  }

  public _handleReaderBitMap(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    let base64 = JSON.parse(JSON.stringify(this.base64textString))
    this.formGroup.get('Imagem').setValue(base64)
    this.emiteFormComponentePai()
    }

  public _handleReaderUrl(readerEvt) {  // convert url para exibir no navegador
    this.urlImageSelect = readerEvt.target.result;
    this.formGroup.get('UrlImagemIcone').setValue(this.urlImageSelect)
  }

  public emiteFormComponentePai(){ //Emite para o componente pai as alterações da imagem
    this.onChangeImageSubMenu.emit(this.formGroup.value)
  }

}
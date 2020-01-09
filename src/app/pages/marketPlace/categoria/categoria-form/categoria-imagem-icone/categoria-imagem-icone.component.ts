import { CategoriaImagemService } from './../../shared/categoriaImagens.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { CategoriaService } from '../../shared/categoria.service';

let createFormGroup = () => {
    return new FormGroup({
      'NomeImagem': new FormControl(''),
      'UrlImagemIcone': new FormControl(''),
      'Imagem': new FormControl(''),
      'TypeImage': new FormControl(''),
      }
    );
  }

@Component({
  selector: 'incca-categoria-imagem-icone',
  templateUrl: './categoria-imagem-icone.component.html',
  styleUrls: ['./categoria-imagem-icone.component.scss'],
})

export class CategoriaImagemIconeComponent implements OnInit {

  @Output() onChangeImage = new EventEmitter()
  @Input() iconeCaminho: string
  public isitemSelected: boolean = false
  public formGroup: FormGroup;
  public urlImage: string
  public urlImageSelect: string = ''
  public base64textString: string = ''
  public fileToUpload: File = null
  public nameImage: string
  public openedImagem: boolean = false
  public semImagem = "../../../../../../assets/img/utils/sem_imagem.jpg"
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/Categorias/Icones/')
  
  constructor(public categoriaImagemService: CategoriaImagemService,
              public categoriaService: CategoriaService
    ) {
    this.formGroup = createFormGroup()
  }

  ngOnDestroy(): void {
    this.formGroup = createFormGroup();
  }

  ngOnInit() {

    console.log(this.formGroup.value)
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

  public getUrlIconeCategoria(): string {
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
    this.onChangeImage.emit(this.formGroup.value)
  }
}
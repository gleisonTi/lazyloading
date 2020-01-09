import { Component, OnInit, Injector, Output, EventEmitter } from '@angular/core';
import { ImagemService } from './imagem.service';
import { BaseResourceGridComponent } from '../base-resource-grid/base-resource-grid.component';
import { Imagem } from '../../models/image.model';
import { INCCA_WEB_URL } from '../../services/api.inccaWeb';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PedidoConsumoRoutingModule } from 'src/app/pages/basico/pedido-consumo/pedido-consumo-routing.module';

let createFormGroup = (dataItem?: Imagem) => {
  if (dataItem) {
    return new FormGroup({
      'ImagemId': new FormControl(dataItem.ImagemId),
      'Imagem': new FormControl(dataItem.Imagem, Validators.required),
      'TypeImage': new FormControl(dataItem.TypeImage,),
    }
    )
  } else {
    return new FormGroup({
      'ImagemId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'Imagem': new FormControl('', Validators.required),
      'TypeImage': new FormControl('', Validators.required),
    })
  }
}
@Component({
  selector: 'incca-imagem',
  templateUrl: './imagem.component.html',
  styleUrls: ['./imagem.component.scss']
})

export class ImagemComponent extends BaseResourceGridComponent<Imagem> implements OnInit {

  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/')
  @Output() sendUrlImage = new EventEmitter<string>()
  public isitemSelected: boolean = false
  public urlImage: string
  public urlImageSelect: string = ''
  public base64textString: string = ''
  public fileToUpload: File = null
  public nameImage: string
  public semImagem = "../../../../assets/img/utils/sem_imagem.jpg"
  constructor(protected injector: Injector, protected imagemService: ImagemService) {
    super(injector, new Imagem(), imagemService, createFormGroup)
  }
  ngOnInit() {
    super.ngOnInit()
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = Imagem.fromJson(formGroup.value)
    console.log(this.resource);
    this.imagemService.save(this.resource, isNew)
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = Imagem.fromJson(dataItem)
    console.log(this.resource);
    this.resourceService.remove(this.resource)
  }

  public getNameImagem(urlName: string): string {
    return urlName.replace("ArquivosUpload", "")
  }

  public selectionChange({ selectedRows }) {
    this.isitemSelected = true
    this.urlImage = selectedRows[0].dataItem.Imagem

  }
  public itemSelecionado() {
    this.sendUrlImage.emit(this.urlImage)
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
      this.formGroup.get('TypeImage').setValue(file.item(0).type.replace("image/",""))
    }

  }
  public _handleReaderBitMap(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.formGroup.get('Imagem').setValue(this.base64textString)
  }
  public _handleReaderUrl(readerEvt) {  // convert url para exibir no navegador
    this.urlImageSelect = readerEvt.target.result;

  }


  public geturlImagem(): string {
    if (this.urlImageSelect !== '') {
      return this.urlImageSelect
    } else {
      return this.semImagem
    }
  }


}


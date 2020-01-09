import { Component, OnInit, Injector, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { VariacaoImagem } from '../shared/variacao-imagem.model';
import { VariacaoImagemService } from '../shared/variacao-imagem.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { Imagem } from 'src/app/shared/models/image.model';
import { Variacao } from '../../variacao/shared/variacao.model';
import { tap } from 'rxjs/operators';

let createFormGroup = (dataItem?: VariacaoImagem) => {

  if (dataItem) {
    return new FormGroup({
      'VariacaoImagemId': new FormControl(dataItem.VariacaoImagemId),
      'VariacaoId': new FormControl(dataItem.VariacaoId),
      'VariacaoImagemFoto': new FormControl(dataItem.VariacaoImagemFoto, Validators.required),
      'VariacaoImagemOrdem': new FormControl(dataItem.VariacaoImagemOrdem, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      'Imagem': new FormControl(''),
      'TypeImage': new FormControl(''),
      'NomeImagem': new FormControl(''),
    });
  } else {
    return new FormGroup({
      'VariacaoImagemId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'VariacaoId': new FormControl(''), // recebe o paramtro do pda varicao
      'VariacaoImagemFoto': new FormControl('', Validators.required),
      'VariacaoImagemOrdem': new FormControl(0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      'Imagem': new FormControl(''),
      'TypeImage': new FormControl(''),
      'NomeImagem': new FormControl(''),

    });
  }
}

@Component({
  selector: 'incca-variacao-imagem-grid',
  templateUrl: './variacao-imagem-grid.component.html',
  styleUrls: ['./variacao-imagem-grid.component.scss']
})
export class VariacaoImagemGridComponent extends BaseResourceGridComponent<VariacaoImagem> implements OnInit {


  @Input() variacaoDataItem: Variacao
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/')
  public isitemSelected: boolean = false
  public urlImage: string
  public urlImageSelect: string = ''
  public base64textString: string = ''
  public fileToUpload: File = null
  public nameImage: string
  public openedImagem: boolean = false
  public nomeImagem: string = ''
  public semImagem = "../../../../assets/img/utils/sem_imagem.jpg"

  constructor(protected injector: Injector, protected varicaoImagemService: VariacaoImagemService) {
    super(injector, new VariacaoImagem(), varicaoImagemService, createFormGroup)
  }
  ngOnInit() {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'),'VariacaoImagem').subscribe(res => { this.helpList = res; })
    this.resourceService.read(this.gridState,this.variacaoDataItem.VariacaoId)
    this.view = this.resourceService;
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {

    this.varicaoImagemService.postFile(formGroup.get('Imagem').value, formGroup.get('TypeImage').value,formGroup.get('NomeImagem').value)
      .subscribe(res => {
        this.formGroup.get('VariacaoImagemFoto').setValue(res)/// caminho foto
        this.formGroup.get('VariacaoId').setValue(this.variacaoDataItem.VariacaoId)
        this.resource = VariacaoImagem.fromJson(formGroup.value)
        this.resourceService.save(this.resource, isNew)

      })
    this.nameImage = ""
    this.urlImageSelect = ""
    sender.closeRow(rowIndex);
  }
  public removeHandler({ dataItem }) {
    this.resource = VariacaoImagem.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public close() {
    this.openedImagem = false
  }
  public opemImage() {
    this.openedImagem = true
  }

  public getImageChild(e) {
    this.openedImagem = false
    console.log(e)
    this.nomeImagem = e
    this.formGroup.get('VariacaoImagemFoto').setValue(e)
    console.log(this.formGroup)
  }

  public getNameImagem(urlName: string): string {
    return urlName.replace("ArquivosUpload", "")
  }

  public geturlImagem(): string {
    console.log(this.urlImageSelect);
    if (this.urlImageSelect !== '') {
      return this.urlImageSelect
    } else {
      return this.semImagem
    }
  }

  public getImageEvent(file: FileList) {
    if (file && file.item(0)) {
      this.formGroup.get('NomeImagem').setValue(file[0].name)
      var reader = new FileReader();
      var readerbit = new FileReader();
      readerbit.onload = this._handleReaderBitMap.bind(this);
      reader.onload = this._handleReaderUrl.bind(this);
      readerbit.readAsBinaryString(file.item(0));
      reader.readAsDataURL(file.item(0))
      this.fileToUpload = file.item(0)
      this.nameImage = this.fileToUpload.name
      this.formGroup.get('TypeImage').setValue(file.item(0).type.replace("image/", ""))
    }

  }
  public _handleReaderBitMap(readerEvt) { // convert image bitmap na base 64
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.formGroup.get('Imagem').setValue(this.base64textString)
  }
  public _handleReaderUrl(readerEvt) {  // convert url para exibir no navegador
    this.urlImageSelect = readerEvt.target.result;
    this.formGroup.get('VariacaoImagemFoto').setValue(this.urlImageSelect)

  }
}

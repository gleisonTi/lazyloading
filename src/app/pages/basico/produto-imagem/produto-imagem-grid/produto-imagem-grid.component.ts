import { Message } from './../../../../shared/models/message.model';
import { Component, OnInit, Input, Injector } from '@angular/core';
import { ProdutoImagem } from '../shared/produto-imagem.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { INCCA_WEB_URL } from 'src/app/shared/services/api.inccaWeb';
import { ProdutoImagemService } from '../shared/produto-imagem.service';
import { Produto } from '../../produto/shared/produto.model';
import { ToastrService } from 'ngx-toastr';

let createFormGroup = (dataItem?: ProdutoImagem) => {
  if (dataItem) {
    return new FormGroup({
      'ProdutoId': new FormControl(dataItem.ProdutoId),
      'ProdutoImagemFoto': new FormControl(dataItem.ProdutoImagemFoto, Validators.required),
      'ProdutoImagemOrdem': new FormControl(dataItem.ProdutoImagemOrdem, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      'ProdutoImagemId': new FormControl(dataItem.ProdutoImagemId),
      'Imagem': new FormControl(''),
      'TypeImage': new FormControl(''),
      'NomeImagem': new FormControl('')
    })
  } else {
    return new FormGroup({
      'ProdutoId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'ProdutoImagemFoto': new FormControl('', Validators.required),
      'ProdutoImagemOrdem': new FormControl(0, Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
      'ProdutoImagemId': new FormControl('00000000-0000-0000-0000-000000000000'),
      'Imagem': new FormControl(''),
      'TypeImage': new FormControl(''),
      'NomeImagem': new FormControl('')
    });
  }
}

@Component({
  selector: 'incca-produto-imagem-grid',
  templateUrl: './produto-imagem-grid.component.html',
  styleUrls: ['./produto-imagem-grid.component.scss']
})
export class ProdutoImagemGridComponent extends BaseResourceGridComponent<ProdutoImagem> implements OnInit {

  @Input() produtoId: string
  public baseUrl = INCCA_WEB_URL.replace('rest', 'ArquivosUpload/')
  public isitemSelected: boolean = false;
  public urlImage: string;
  public urlImageSelect: string = '';
  public base64textString: string = '';
  public autoNumberImagem: number;
  public fileToUpload: File = null;
  public nameImage: string;
  public openedImagem: boolean = false;
  public nomeImagem: string = '';
  public semImagem = "../../../../assets/img/utils/sem_imagem.jpg";

  constructor(
    protected injector: Injector,
    protected produtoImagemService: ProdutoImagemService,
    public popupMessage: ToastrService) {
    super(injector, new ProdutoImagem(), produtoImagemService, createFormGroup)
  }
  ngOnInit() {
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ProdutoImagem').subscribe(res => { this.helpList = res; })
    this.resourceService.read(this.gridState, this.produtoId)
    this.view = this.resourceService;

    this.produtoImagemService.autoNumberOrdemImagem(this.produtoId).subscribe(res => {
      this.autoNumberImagem = res.contador;
    });
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.produtoImagemService.postFile(formGroup.get('NomeImagem').value, formGroup.get('Imagem').value, formGroup.get('TypeImage').value)
      .subscribe(res => {
        console.log(res);
        if (res.message.Id === '') {
          this.formGroup.get('ProdutoImagemFoto').setValue(res.resultString);
          this.formGroup.get('ProdutoId').setValue(this.produtoId);
          this.resource = ProdutoImagem.fromJson(formGroup.value);
          this.resourceService.save(this.resource, isNew);
        } else {
          this.popupMessage.error(res.message.Description, res.message.Id)
        }


      });
    this.nameImage = "";
    this.urlImageSelect = "";
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ProdutoImagem.fromJson(dataItem)
    this.resourceService.remove(this.resource)
  }

  public addHandler({ sender }) {
    this.closeEditor(sender);
    this.getAutoNumberImagem()
    this.formGroup = this.createFormGroupFn();
    sender.addRow(this.formGroup);
  }

  public getAutoNumberImagem() {
    this.produtoImagemService.autoNumberOrdemImagem(this.produtoId).subscribe(res => {
      this.autoNumberImagem = res.contador;
    });
  }

  public getImageChild(e) {
    this.openedImagem = false
    this.nomeImagem = e;
    this.formGroup.get('ProdutoImagemFoto').setValue(e);
  }

  public getNameImagem(urlName: string): string {
    return urlName.replace("ArquivosUpload", "");
  }

  public geturlImagem(): string {
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
      this.nameImage = this.fileToUpload.name;
      this.formGroup.get('NomeImagem').setValue(this.fileToUpload.name);
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
    this.formGroup.get('ProdutoImagemFoto').setValue(this.urlImageSelect)
  }



}

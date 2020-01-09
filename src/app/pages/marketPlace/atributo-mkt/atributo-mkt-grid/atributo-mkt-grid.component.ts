import { AtributoMkt } from './../shared/atributo-mkt.model';
import { AtributoMktService } from './../shared/atributo-mkt.service';
import { AtributoService } from './../../../basico/atributo/shared/atributo.service';
import { Atributo } from './../../../basico/atributo/shared/atributo.model';
import { Component, OnInit, Injector, OnDestroy } from '@angular/core';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

let createFormGroup = (dataItem?: AtributoMkt) => {
  if (dataItem) {
    return new FormGroup({
      AtributoMktId: new FormControl(dataItem.AtributoMktId),
      AtributoId: new FormControl(dataItem.AtributoId, Validators.required),
      MktPlaceId: new FormControl(dataItem.MktPlaceId),
      AtributoIdMktplace: new FormControl(dataItem.AtributoIdMktplace),
    }
    );
  } else {
    return new FormGroup({
      AtributoMktId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoId: new FormControl('00000000-0000-0000-0000-000000000000', Validators.required),
      MktPlaceId: new FormControl(''),
      AtributoIdMktplace: new FormControl(''),
    });
  }
};

@Component({
  selector: 'incca-atributo-mkt-grid',
  templateUrl: './atributo-mkt-grid.component.html',
  styleUrls: ['./atributo-mkt-grid.component.scss']
})
export class AtributoMktMarketPlace extends BaseResourceGridComponent<AtributoMkt> implements OnInit, OnDestroy {

  public nomeMarketPlace: string;
  public rotaAtual: Subscription;
  public atributoList:Atributo[] = []

  constructor(protected injector: Injector, 
    protected atributoMktService: AtributoMktService,
    protected atributoService: AtributoService,
    public route: ActivatedRoute
    ) {
    super(injector, new AtributoMkt(),
          atributoMktService,
          createFormGroup);
  }

  public ngOnInit(): void {
    this.getNomeMkt()
    this.atributoService.getAll().subscribe((res) => {this.atributoList = res.data}) 
  }

  public ngAfterViewChecked(): void {
    this.formGroup.get('MktPlaceId').setValue(this.nomeMarketPlace)
  }

  public getNomeMkt(): void {
    this.rotaAtual = this.route.data.subscribe((res) => {
      switch(res.title){
        case 'Atributos ML':{
          this.nomeMarketPlace = 'MERCADOLIVRE'
          break;
        }
        case 'Atributos Integra':{
          this.nomeMarketPlace = 'LOJAINTEGRADA'
          break;
        }
        case 'Atributos Irroba':{
          this.nomeMarketPlace = 'IRROBA'
          break;
        }
        case 'Atributos Netshoes':{
          this.nomeMarketPlace = 'NETSHOES'
          break;
        }
        case 'Atributos B2W':{
          this.nomeMarketPlace = 'B2W'
          break;
        }
      }

      this.atributoMktService.setValorMarketPlace(this.nomeMarketPlace)
      super.ngOnInit()
    })
  }

  public ngOnDestroy(): void {
    this.rotaAtual.unsubscribe();
  }

  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    this.resource = AtributoMkt.fromJson(formGroup.value );
    this.resourceService.save(this.resource , isNew );
    sender.closeRow(rowIndex);
  }

  public selectionAtributoChange(e) {
    if (this.formGroup !== undefined) {
      this.formGroup.get('AtributoId').setValue(e.AtributoId)
    }
  }

  public getNameAtributo(dataItem: Atributo): string {
    return this.atributoList.length !== 0 ? this.atributoList.find(item =>
       item.AtributoId === dataItem.AtributoId).AtributoDescricao : 'Carregando...';
  }

  public removeHandler({ dataItem }) {
    this.resource = AtributoMkt.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

}
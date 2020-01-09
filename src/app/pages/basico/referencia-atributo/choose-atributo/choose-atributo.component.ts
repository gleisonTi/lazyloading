import { Component, OnInit, Input, Inject, Injectable } from '@angular/core';
import { ReferenciaAtributo } from '../shared/referencia-atributo.model';
import { ReferenciaAtributoService } from '../shared/referencia-atributo.service';
import { AtributoService } from '../../atributo/shared/atributo.service';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { map, tap } from 'rxjs/operators';
import { FormGroup, FormControl } from '@angular/forms';
import { Atributo } from '../../atributo/shared/atributo.model';
import { State } from '@progress/kendo-data-query';

@Component({
  selector: 'incca-choose-atributo',
  templateUrl: './choose-atributo.component.html',
  styleUrls: ['./choose-atributo.component.scss'],
  providers:[ReferenciaAtributoService]
})
@Injectable()
export class ChooseAtributoComponent  implements OnInit {
  public loading: boolean = true
  @Input() atributoId: string
  @Input() atributoNome: string
  @Input() referenciaId: string
  public view: Observable<GridDataResult>
  public atributoService: AtributoService;
  public referenciaList: ReferenciaAtributo[] = []
  public atributosSelecionadas: string[] = []
  public gridState: State = {
    sort: [],
    skip: 0,
    take: 10,
  };


  constructor(
    @Inject(AtributoService) editServiceFactory: any,
    public referenciaAtributoService: ReferenciaAtributoService,
  ) {
    this.atributoService = editServiceFactory()
  }

  ngOnInit() {
    this.referenciaAtributoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data)

    this.referenciaAtributoService.getAll(null, this.referenciaId).pipe(map(res => {
      this.referenciaList = res.data;
      // testa se a lista e undefined se não retorna lista com array de guids para seleção
      return this.referenciaList ? this.referenciaList.map(item => item.AtributoId) : [];
    }))
    .subscribe(res => this.atributosSelecionadas = res);

    this.atributoService.read(null,this.atributoId);
    this.view = this.atributoService.pipe(tap(res => this.loading = false));
  }

  public onStateChange(state: State) {
    this.gridState = state
    this.atributoService.read(this.gridState, this.atributoId, );
    this.atributoService.getAll(this.gridState, this.atributoId).subscribe(res => console.log(res))
  }a


  public selectionChange(e) {
    if (e.selected) {

      let referenciaAtributo = new ReferenciaAtributo(
        "00000000-0000-0000-0000-000000000000",
        this.referenciaId,
        e.selectedRows[0].dataItem.AtributoId,
        "","",
        false);

      this.referenciaAtributoService.save(referenciaAtributo,true).subscribe(() => {
        this.referenciaAtributoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data)
      });

    } else {

      let refAtributoAux: ReferenciaAtributo;
      refAtributoAux =  this.referenciaList.find(item => // busca dados pela AtributoId e ReferenciaId
        item.ReferenciaId === this.referenciaId && item.AtributoId === e.deselectedRows[0].dataItem.AtributoId);
      let referenciaAtributo = ReferenciaAtributo.fromJson(refAtributoAux);
      this.referenciaAtributoService.remove(referenciaAtributo).subscribe(()=>{
        this.referenciaAtributoService.getAll(null, this.referenciaId).subscribe(res => this.referenciaList = res.data);
      });
    }
  }
   // funcões para checkbox do grid
   public getcheckValue(dataItem: Atributo, atributo: string ): boolean {
    if (this.referenciaList) {
      if (atributo === 'Inativo') {
        const isInativo = this.referenciaList.find(item => item.AtributoId === dataItem.AtributoId) ?
        this.referenciaList.find(item => item.AtributoId === dataItem.AtributoId).ReferenciaAtributoInativo : false;
        return isInativo;
      }
    } else {
      return false;
    }
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    // .log(dataItem);
    if (!isEdited) {
      sender.editCell(rowIndex, columnIndex, createFormGroup(dataItem));
    }

  }

  public cellCloseHandler(args: any) {
    // const { formGroup, dataItem } = args;
    // console.log(args);
  }

  public changeInativo(e, dataItem, atributo) {

    let referenciaAtributo: ReferenciaAtributo;
    referenciaAtributo = this.referenciaList.find(item => {
      return item.AtributoId === dataItem.AtributoId;
    });

    if (referenciaAtributo) {
      referenciaAtributo = ReferenciaAtributo.fromJson(referenciaAtributo); // passa dados para Id de BaseResourceModel

      if (e.target.checked) {
        if (atributo === 'Inativo') {
          console.log(atributo);
          referenciaAtributo.ReferenciaAtributoInativo = true;
        }
        this.referenciaAtributoService.save(referenciaAtributo, false).subscribe((res) => { // update
          this.referenciaAtributoService.getAll(null, res.ReferenciaId).subscribe(res => this.referenciaList = res.data);
        });

        //  console.log(referenciaVariacao);
      } else {

        if (atributo === 'Inativo') {
          console.log(atributo);
          referenciaAtributo.ReferenciaAtributoInativo = false;
        }
        this.referenciaAtributoService.save(referenciaAtributo, false).subscribe((res) => { // update
          this.referenciaAtributoService.getAll(null, res.ReferenciaId).subscribe(res => this.referenciaList = res.data);
        });
        // console.log(referenciaVariacao);

      }

    } else {

    }

  }

}

const createFormGroup = (dataItem?: ReferenciaAtributo) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaAtributoId: new FormControl(dataItem.ReferenciaAtributoId),
      AtributoId: new FormControl(dataItem.AtributoId),
      ReferenciaAtributoInativo: new FormControl(dataItem.ReferenciaAtributoInativo),
    }
    );
  } else {
    return new FormGroup({
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaAtributoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      AtributoId: new FormControl(''),
      ReferenciaAtributoInativo: new FormControl(false),
    });
  }
};

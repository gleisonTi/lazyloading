import { Component, OnInit, Input, Injector, Inject } from '@angular/core';
import { ReferenciaAtributo } from '../shared/referencia-atributo.model';
import { Atributo } from '../../atributo/shared/atributo.model';
import { GrupoAtributo } from '../../grupo-atributo/shared/grupo-atributo.model';
import { AtributoService } from '../../atributo/shared/atributo.service';
import { ReferenciaAtributoService } from '../shared/referencia-atributo.service';
import { GrupoAtributoService } from '../../grupo-atributo/shared/grupo-atributo.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { FormGroup, FormControl } from '@angular/forms';
import { ReferenciaService } from '../../referencia/shared/referencia.service';

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
@Component({
  selector: 'incca-referencia-atributo-grid',
  templateUrl: './referencia-atributo-grid.component.html',
  styleUrls: ['./referencia-atributo-grid.component.scss']
})
export class ReferenciaAtributoGridComponent extends BaseResourceGridComponent<ReferenciaAtributo> implements OnInit {

  @Input() referenciaId: string;
  @Input() grupoId: string;
  public dataAtributo: Atributo[] = [];
  public atributoList: Atributo[] = [];
  public grupoAtributoList: GrupoAtributo[] = [];
  public referenciaAtributo: ReferenciaAtributo[] = [];
  public atributoService: AtributoService;
  public subAtributoService: AtributoService;
  formGroup: FormGroup;

  constructor(
    protected injector: Injector,
    @Inject(ReferenciaAtributoService) editServiceFactory: any,
    @Inject(AtributoService) atributoServiceFactory: any,
    protected referenciaAtributoService: ReferenciaAtributoService,
    public grupoAtributoService: GrupoAtributoService,
  ) {
    super(injector, new ReferenciaAtributo(), referenciaAtributoService = editServiceFactory(), createFormGroup);
    this.atributoService = atributoServiceFactory();
    this.subAtributoService = atributoServiceFactory();
  }
  public ngOnInit(): void {
    this.referenciaAtributoService.getHelp(localStorage.getItem('Seguimento'), 'ReferenciaAtributo')
    .subscribe(res => {this.helpList = res;});//help

    // e necessario criar uma logica para habilitar ou não o gerar produto
    // pode ser necessario mudar de referenciaVariação  para Variação pai
    //this.referenciaAtributoService.getAll(null,this.referenciaId).subscribe(res => console.log(res))

    this.grupoAtributoService.getAll(undefined, this.grupoId).subscribe(res => {
      console.log(res)

      this.grupoAtributoList = res.data ? res.data : [];
      this.atributoService.getAll().subscribe(res => {
        console.log(res)
        this.atributoList = res.data;
        if (this.grupoAtributoList.length !== 0 ) {    // busca variações pais a partir do grupo escolhido
          this.grupoAtributoList.forEach(item => {
            this.dataAtributo.push(this.atributoList.find(itemf => itemf.AtributoId === item.AtributoId));
          });
        }
      });
    });

  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
        console.log(dataItem)
        console.log('row: '+rowIndex+" col: "+ columnIndex)
        sender.editCell(rowIndex, columnIndex, createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
      const { formGroup, dataItem } = args;
      console.log(args);
  }


}


import { Component, OnInit, Input, Injector, Injectable, Inject, OnDestroy } from '@angular/core';
import { ReferenciaVariacao } from '../shared/referencia-variacao.model';
import { Variacao } from '../../variacao/shared/variacao.model';
import { FormGroup, FormControl } from '@angular/forms';
import { ReferenciaService } from '../../referencia/shared/referencia.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { VariacaoService } from '../../variacao/shared/variacao.service';
import { ReferenciaVariacaoService } from '../shared/referencia-variacao.service';
import { Observable } from 'rxjs';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { GrupoVariacaoService } from '../../grupo-variacao/shared/grupo-variacao.service';
import { GrupoVariacao } from '../../grupo-variacao/shared/grupo-variacao.model';

const createFormGroup = (dataItem?: ReferenciaVariacao) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaVariacaoId: new FormControl(dataItem.ReferenciaVariacaoId),
      VariacaoId: new FormControl(dataItem.VariacaoId),
      ReferenciaVariacaoInativo: new FormControl(dataItem.ReferenciaVariacaoInativo),
      ReferenciaVariacaoGeraProduto: new FormControl(dataItem.ReferenciaVariacaoGeraProduto),
    }
    );
  } else {
    return new FormGroup({
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaVariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoId: new FormControl(''),
      ReferenciaVariacaoInativo: new FormControl(false),
      ReferenciaVariacaoGeraProduto: new FormControl(false),
    });
  }
};
@Component({
  selector: 'incca-referencia-variacao-grid',
  templateUrl: './referencia-variacao-grid.component.html',
  styleUrls: ['./referencia-variacao-grid.component.scss'],
})
export class ReferenciaVariacaoGridComponent extends BaseResourceGridComponent<ReferenciaVariacao> implements OnInit {

  @Input() referenciaId: string;
  @Input() grupoId: string;
  @Input() fabricanteId = '';
  @Input() colecaoId = '';

  public dataVariacao: Variacao[] = [];
  public variacaoList: Variacao[] = [];
  public grupoVariacaoList: GrupoVariacao[] = [];
  public referenciaVariacao: ReferenciaVariacao[] = [];
  public variacaoService: VariacaoService;
  public subvariacaoService: VariacaoService;
  formGroup: FormGroup;

  constructor(
    protected injector: Injector,
    @Inject(ReferenciaVariacaoService) editServiceFactory: any,
    @Inject(VariacaoService) varicaoServiceFactory: any,
    protected referenciaVariacaoService: ReferenciaVariacaoService,
    public grupoVariacaoService: GrupoVariacaoService,
  ) {
    super(injector, new ReferenciaVariacao(), referenciaVariacaoService = editServiceFactory(), createFormGroup);
    this.variacaoService = varicaoServiceFactory();
    this.subvariacaoService = varicaoServiceFactory();
  }
  public ngOnInit(): void {
    this.referenciaVariacaoService.getHelp(localStorage.getItem('Seguimento'), 'ReferenciaVariacao')
    .subscribe(res => {this.helpList = res;});//help
    // e necessario criar uma logica para habilitar ou não o gerar produto
    // pode ser necessario mudar de referenciaVariação  para Variação pai
    //this.referenciaVariacaoService.getAll(null,this.referenciaId).subscribe(res => console.log(res))

    this.grupoVariacaoService.getAll(undefined, this.grupoId).subscribe(res => {
      this.grupoVariacaoList = res.data ? res.data : [];
      this.variacaoService.getAll().subscribe(res => {
        this.variacaoList = res.data;
        if (this.grupoVariacaoList.length !== 0 ) {    // busca variações pais a partir do grupo escolhido
          this.grupoVariacaoList.forEach(item => {
            this.dataVariacao.push(this.variacaoList.find(itemf => itemf.VariacaoId === item.VariacaoId));
          });
        }
      });
    });
  }

  public cellClickHandler({ sender, rowIndex, columnIndex, dataItem, isEdited }) {
    if (!isEdited) {
        sender.editCell(rowIndex, columnIndex, createFormGroup(dataItem));
    }
  }

  public cellCloseHandler(args: any) {
      const { formGroup, dataItem } = args;
      console.log(args);
  }


}

import { Component, OnInit, Injector, Input, Injectable } from '@angular/core';
import { GrupoVariacao } from '../shared/grupo-variacao.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GrupoVariacaoService } from '../shared/grupo-variacao.service';
import { VariacaoService } from '../../variacao/shared/variacao.service';
import { Variacao } from '../../variacao/shared/variacao.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { tap } from 'rxjs/operators';

const createFormGroup = (dataItem?: GrupoVariacao) => {
  if (dataItem) {
    return new FormGroup({
      GrupoId: new FormControl(dataItem.GrupoId),
      GrupoVariacaoId: new FormControl(dataItem.GrupoVariacaoId),
      VariacaoId: new FormControl(dataItem.VariacaoId, Validators.required),

    }
    );
  } else {
    return new FormGroup({
      GrupoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      GrupoVariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      VariacaoId: new FormControl('00000000-0000-0000-0000-000000000000'),
    });
  }
};
@Component({
  selector: 'incca-grupo-variacao-grid',
  templateUrl: './grupo-variacao-grid.component.html',
  styleUrls: ['./grupo-variacao-grid.component.scss'],
  providers:[VariacaoService]
})

@Injectable()
export class GrupoVariacaoGridComponent extends BaseResourceGridComponent<GrupoVariacao> implements OnInit {

  @Input() grupoId: string;
  public dataVariacao: Variacao[] = [];
  public variacaoList: Variacao[] = [];

  formGroup: FormGroup;
  constructor(
    protected injector: Injector,
    protected grupoVariacaoService: GrupoVariacaoService,
    public variacaoService: VariacaoService
  ) {
    super(injector, new GrupoVariacao(), grupoVariacaoService, createFormGroup);
  }
  public ngOnInit(): void {
    console.log(this.grupoId);
    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'GrupoVariacao').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.grupoId);
    this.view = this.resourceService
    this.variacaoService.getAll().subscribe(res => {
      this.variacaoList = res.data;
      this.dataVariacao = res.data;
    });
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('GrupoId').setValue(this.grupoId);
    this.resource = GrupoVariacao.fromJson(formGroup.value);
    this.resourceService.save(this.resource, isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = GrupoVariacao.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: Variacao): string {
    return this.variacaoList.length !== 0 ? this.variacaoList.find(item => item.VariacaoId === dataItem.VariacaoId).VariacaoDescricao : 'carregando';
  }

  handleVariacaoFilter(value: string) {
    this.dataVariacao = this.variacaoList.filter((item) => item.VariacaoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public onSetorChange(e) {
    this.variacaoList.filter(item => item.VariacaoId === e);
  }

}

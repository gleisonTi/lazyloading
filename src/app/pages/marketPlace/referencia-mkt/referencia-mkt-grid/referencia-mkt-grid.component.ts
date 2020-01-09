import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReferenciaMkt } from './../shared/referencia-mkt.model';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { ReferenciaMktService } from './../shared/referencia-mkt.service';
import { ReferenciaMktCategoria } from '../shared/referencia-categoria-mkt.model';
import { CategoriaService } from '../../categoria/shared/categoria.service';


const createFormGroup = (dataItem?: ReferenciaMkt) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaMktId: new FormControl(dataItem.ReferenciaMktId),
      ReferenciaId: new FormControl(dataItem.ReferenciaId, Validators.required),
      ReferenciaMktInativo: new FormControl(dataItem.ReferenciaMktInativo),
      ReferenciaMktDescricao: new FormControl(dataItem.ReferenciaMktDescricao, Validators.required),
      ReferenciaMktControlaEstoque: new FormControl(dataItem.ReferenciaMktControlaEstoque),
      ReferenciaMktSomenteLogado: new FormControl(dataItem.ReferenciaMktSomenteLogado),
      ReferenciaMktDisponibilidade: new FormControl(dataItem.ReferenciaMktDisponibilidade),
      ReferenciaMktDataDisponivel: new FormControl(new Date(dataItem.ReferenciaMktDataDisponivel)),
      ReferenciaMktTipoMercadoria: new FormControl(dataItem.ReferenciaMktTipoMercadoria),
      ReferenciaMktFreteGratis: new FormControl(dataItem.ReferenciaMktFreteGratis),
      ReferenciaMktCadastroUsuario: new FormControl(dataItem.ReferenciaMktCadastroUsuario),
      ReferenciaMktCadastroData: new FormControl(dataItem.ReferenciaMktCadastroData),
      ReferenciaMktAlteracaoUsuario: new FormControl(dataItem.ReferenciaMktAlteracaoUsuario),
      ReferenciaMktAlteracaoData: new FormControl(dataItem.ReferenciaMktAlteracaoData),
      MktPlaceId: new FormControl('MERCADOLIVRE')
    }
    );
  } else {
    return new FormGroup({
      ReferenciaMktId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000', Validators.required),
      ReferenciaMktInativo: new FormControl(false),
      ReferenciaMktDescricao: new FormControl('', Validators.required),
      ReferenciaMktControlaEstoque: new FormControl(false),
      ReferenciaMktSomenteLogado: new FormControl(false),
      ReferenciaMktDisponibilidade: new FormControl(0),
      ReferenciaMktDataDisponivel: new FormControl(''),
      ReferenciaMktTipoMercadoria: new FormControl(0),
      ReferenciaMktFreteGratis: new FormControl(false),
      ReferenciaMktCadastroUsuario: new FormControl(''),
      ReferenciaMktCadastroData: new FormControl(''),
      ReferenciaMktAlteracaoUsuario: new FormControl(''),
      ReferenciaMktAlteracaoData: new FormControl(''),
      MktPlaceId: new FormControl('MERCADOLIVRE')
    });
  }
};

@Component({
  selector: 'incca-referencia-mkt-grid',
  templateUrl: './referencia-mkt-grid.component.html',
  styleUrls: ['./referencia-mkt-grid.component.scss']
})

export class ReferenciaMktGridComponent extends BaseResourceGridComponent<ReferenciaMkt> implements OnInit {

  public createFromGroupCategoriaMkt: FormGroup;
  public createFormGroup: FormGroup
  public openedCadReferenciaMkt = false;
  public isNew: boolean;
  public columns: any[] = [
    { field: 'ReferenciaMktDescricao', title: 'Descrição da referência' },
    { field: 'ReferenciaMktInativo', title: 'Inativo' },
  ];

  constructor(
    protected injector: Injector,
    public referenciaMktService: ReferenciaMktService,
    public categoriaService: CategoriaService
  ) {
    super(injector, new ReferenciaMkt(), referenciaMktService, createFormGroup);
  }

  ngOnInit() {
    super.ngOnInit();
  }

  public removeHandler({ dataItem }) {
    this.resource = ReferenciaMkt.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public close() {
    this.openedCadReferenciaMkt = false;
  }

  public open({ isNew, dataItem }) {
    if (dataItem) {
      this.createFormGroup = createFormGroup(dataItem); // update
    } else {
      this.createFormGroup = createFormGroup(); // insert
    }
    this.isNew = isNew; // passado como parametro para o form de referencia
    this.openedCadReferenciaMkt = true;
  }

}
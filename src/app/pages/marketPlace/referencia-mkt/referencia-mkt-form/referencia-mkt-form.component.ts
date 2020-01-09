import { CategoriaService } from './../../categoria/shared/categoria.service';
import { Referencia } from './../../../basico/referencia/shared/referencia.model';
import { ReferenciaMkt } from './../shared/referencia-mkt.model';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReferenciaMktService } from '../shared/referencia-mkt.service';
import { ReferenciaService } from 'src/app/pages/basico/referencia/shared/referencia.service';
import { formatDate } from '@telerik/kendo-intl';
import { Categoria } from '../../categoria/shared/categoria.model';
import { ReferenciaMktCategoria } from '../shared/referencia-categoria-mkt.model';

@Component({
  selector: 'incca-referencia-mkt-meli-form',
  templateUrl: './referencia-mkt-form.component.html',
  styleUrls: ['./referencia-mkt-form.component.scss']
})

export class ReferenciaMktForm implements OnInit, OnDestroy {

  public ListCategoriasMarketPlaces = Categoria
  public disponibilidadeList = [

    {descricao: "Pronta Entrega", ReferenciaMktDisponibilidade: 1 },
    {descricao: "1 dia útil", ReferenciaMktDisponibilidade: 9},
    {descricao: "Até 2 dias Úteis", ReferenciaMktDisponibilidade: 10},
    {descricao: "Até 3 dias Úteis", ReferenciaMktDisponibilidade: 11},
    {descricao: "Até 4 dias Útis", ReferenciaMktDisponibilidade: 12},
    {descricao: "Até 5 dias Úteis", ReferenciaMktDisponibilidade: 13},
    {descricao: "Até 6 dias Úteis", ReferenciaMktDisponibilidade: 14},
    {descricao: "Até 7 dias Úteis", ReferenciaMktDisponibilidade: 3},
    {descricao: "Até 8 dias Úteis", ReferenciaMktDisponibilidade: 15},
    {descricao: "Até 9 dias Úteis", ReferenciaMktDisponibilidade: 16},
    {descricao: "Até 10 dias Úteis", ReferenciaMktDisponibilidade: 17},
    {descricao: "Até 15 dias Úteis", ReferenciaMktDisponibilidade: 18},
    {descricao: "Até 20 dias úteis", ReferenciaMktDisponibilidade: 20},
    {descricao: "Até 25 dias Úteis", ReferenciaMktDisponibilidade: 21},
    {descricao: "Até 30 dias Úteis", ReferenciaMktDisponibilidade: 19},
    {descricao: "Até 45 dias Úteis", ReferenciaMktDisponibilidade: 22},
    {descricao: "Até 60 dias Úteis", ReferenciaMktDisponibilidade: 23},
    {descricao: "Até 90 dias Úteis", valReferenciaMktDisponibilidadeue: 24}
  ]

  public tipoMercadoriaList = [
    {descricao: "Nacional", ReferenciaMktTipoMercadoria: 0},
    {descricao: "Estrangeira - Importação direta", ReferenciaMktTipoMercadoria: 1}
  ]

  public categoriaMktList: Categoria[]
  public inativo = false;
  public referenciaList: Referencia[];
  @Input() public isNew: boolean;
  @Input() public formGroup: FormGroup;
  @Input() public ReferenciaMktId: string;
  
  public created = false;
  constructor(
    public referenciaService: ReferenciaService,
    public referenciaMktService: ReferenciaMktService,
  ) {
  }
  ngOnInit() {
    console.log(this.formGroup);
    this.referenciaService.getAll().subscribe(res => {console.log(res); this.referenciaList = res.data });
  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
  }

  onchangeReferenciaList(e){
    this.formGroup.get('ReferenciaId').setValue(e.ReferenciaId)
  }

  salvarDados() {
    var referencia: ReferenciaMkt = ReferenciaMkt.fromJson(this.formGroup.value);
    this.referenciaMktService.save(referencia, this.isNew).subscribe((res) => {
      this.isNew = false;
      this.created = true;
      this.formGroup.get('ReferenciaMktId').setValue(res.ReferenciaMktId)
    })
  }
}

const createFormGroup = (dataItem?: ReferenciaMkt) => {
  if (dataItem) {
    return new FormGroup({
      ReferenciaMktId: new FormControl(dataItem.ReferenciaMktId),
      ReferenciaId: new FormControl(dataItem.ReferenciaId),
      ReferenciaMktInativo: new FormControl(dataItem.ReferenciaMktInativo),
      ReferenciaMktDescricao: new FormControl(dataItem.ReferenciaMktDescricao),
      ReferenciaMktControlaEstoque: new FormControl(dataItem.ReferenciaMktControlaEstoque),
      ReferenciaMktSomenteLogado: new FormControl(dataItem.ReferenciaMktSomenteLogado),
      ReferenciaMktDisponibilidade: new FormControl(new Date(dataItem.ReferenciaMktDisponibilidade)),
      ReferenciaMktTipoMercadoria: new FormControl(dataItem.ReferenciaMktTipoMercadoria),
      ReferenciaMktFreteGratis: new FormControl(dataItem.ReferenciaMktFreteGratis),
      ReferenciaMktCadastroUsuario: new FormControl(dataItem.ReferenciaMktCadastroUsuario),
      ReferenciaMktCadastroData: new FormControl(dataItem.ReferenciaMktCadastroData),
      ReferenciaMktAlteracaoUsuario: new FormControl(dataItem.ReferenciaMktAlteracaoUsuario),
      ReferenciaMktAlteracaoData: new FormControl(dataItem.ReferenciaMktAlteracaoData),
      ReferenciaMktDataDisponivel: new FormControl(new Date(dataItem.ReferenciaMktDataDisponivel)),
      MktPlaceId: new FormControl("MERCADOLIVRE")
    }
    );
  } else {
    return new FormGroup({
      ReferenciaMktId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ReferenciaMktInativo: new FormControl(0),
      ReferenciaMktDescricao: new FormControl(''),
      ReferenciaMktControlaEstoque: new FormControl(0),
      ReferenciaMktSomenteLogado: new FormControl(0),
      ReferenciaMktDisponibilidade: new FormControl(1),  // 1: Pronta entrega
      ReferenciaMktTipoMercadoria: new FormControl(0), // 0: Nacional
      ReferenciaMktFreteGratis: new FormControl(0),
      ReferenciaMktCadastroUsuario: new FormControl(''),
      ReferenciaMktDataDisponivel: new FormControl(new Date()),
      ReferenciaMktCadastroData: new FormControl(''),
      ReferenciaMktAlteracaoUsuario: new FormControl(''),
      ReferenciaMktAlteracaoData: new FormControl(''),
      MktPlaceId: new FormControl("MERCADOLIVRE") 
    });
  }
};

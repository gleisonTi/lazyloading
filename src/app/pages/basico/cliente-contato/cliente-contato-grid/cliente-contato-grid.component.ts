import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClienteContato } from '../shared/cliente-contato.model';
import { Cliente } from '../../cliente/shared/cliente.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteService } from '../../cliente/shared/cliente.service';
import { ClienteContatoService } from '../shared/cliente-contato.service';
import { TipoContato } from '../../tipo-contato/shared/tipo-contato.model';
import { TipoContatoService } from '../../tipo-contato/shared/tipo-contato.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';


const createFormGroup = (dataItem?: ClienteContato) => {
  if (dataItem) {
    return new FormGroup({
      ClienteId: new FormControl(dataItem.ClienteId),
      TipoContatoId: new FormControl(dataItem.TipoContatoId),
      ClienteContatoId: new FormControl(dataItem.ClienteContatoId),
      ClienteContatoNome: new FormControl(dataItem.ClienteContatoNome, Validators.required ),
      ClienteContatoCelular: new FormControl(dataItem.ClienteContatoCelular, Validators.required ),
      ClienteContatoEmail: new FormControl(dataItem.ClienteContatoEmail, Validators.required ),
      ClienteContatoSequencia: new FormControl(dataItem.ClienteContatoSequencia,),
    }
    );
  } else {
    return new FormGroup({
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      TipoContatoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteContatoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteContatoNome: new FormControl('', Validators.required ),
      ClienteContatoCelular: new FormControl('', Validators.required ),
      ClienteContatoEmail: new FormControl('', Validators.required ),
      ClienteContatoSequencia: new FormControl('', ),
    });
  }
};

@Component({
  selector: 'incca-cliente-contato-grid',
  templateUrl: './cliente-contato-grid.component.html',
  styleUrls: ['./cliente-contato-grid.component.scss']
})
export class ClienteContatoGridComponent extends BaseResourceGridComponent<ClienteContato>  implements  OnInit {
  // basaeado em produtoComposicao
  @Input() clienteId: string;
  public openedCadTipoContato = false;
  public dataTipoContato: TipoContato[] = [];
  public tipoContatoList: TipoContato[] = [];

  formGroup: FormGroup;
  constructor(
    protected injector: Injector,
    protected clienteContatoService: ClienteContatoService,
    public tipoContatoService: TipoContatoService
    ) {
    super(injector, new ClienteContato(), clienteContatoService, createFormGroup);
  }
  public ngOnInit(): void {

    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ClienteContato').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.clienteId);
    this.view = this.resourceService;
    this.tipoContatoService.getAll().subscribe(res => {
      this.tipoContatoList = res.data;
      this.dataTipoContato = res.data;});
  }
  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ClienteId').setValue(this.clienteId);
    this.resource = ClienteContato.fromJson(formGroup.value);

    this.resourceService.save(this.resource , isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ClienteContato.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: TipoContato): string {
    return this.tipoContatoList.length !== 0 ? this.tipoContatoList.find(item =>
      item.TipoContatoId === dataItem.TipoContatoId).TipoContatoDescricao : 'carregando';
  }

  handleVariacaoFilter(value: string) {
    this.dataTipoContato = this.tipoContatoList.filter((item) => item.TipoContatoDescricao.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }

  public close() {
    this.openedCadTipoContato = false;
  }
  public updateGrid(e) {
    this.tipoContatoService.getAll().subscribe(res => {
      this.tipoContatoList = res.data;
      this.dataTipoContato = res.data;});
  }

  public opem() {
    this.openedCadTipoContato = true;
  }

}

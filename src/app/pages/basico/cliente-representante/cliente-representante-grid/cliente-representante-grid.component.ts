import { Component, OnInit, Input, Injector } from '@angular/core';
import { ClienteRepresentante } from '../shared/cliente-representante.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Cliente } from '../../cliente/shared/cliente.model';
import { ClienteRepresentanteService } from '../shared/cliente-representante.service';
import { ClienteService } from '../../cliente/shared/cliente.service';
import { BaseResourceGridComponent } from 'src/app/shared/components/base-resource-grid/base-resource-grid.component';
import { map } from 'rxjs/operators';

const createFormGroup = (dataItem?: ClienteRepresentante) => {
  if (dataItem) {
    return new FormGroup({
      ClienteId: new FormControl(dataItem.ClienteId),
      ClienteRepresentanteId: new FormControl(dataItem.ClienteRepresentanteId),
      RepresentanteId: new FormControl(dataItem.RepresentanteId, Validators.required ),
      ClienteRepresentanteContaDeposito: new FormControl(dataItem.ClienteRepresentanteContaDeposito, Validators.required ),
      ClienteRepresentanteTipo: new FormControl(dataItem.ClienteRepresentanteTipo, Validators.required ),
      ClienteRepresentanteComissao: new FormControl(dataItem.ClienteRepresentanteComissao, Validators.required ),
    }
    );
  } else {
    return new FormGroup({
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteRepresentanteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      RepresentanteId: new FormControl('00000000-0000-0000-0000-000000000000', Validators.required ),
      ClienteRepresentanteContaDeposito: new FormControl('', [Validators.required,Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteRepresentanteTipo: new FormControl('', Validators.required ),
      ClienteRepresentanteComissao: new FormControl(0, Validators.required ),
    });
  }
};

@Component({
  selector: 'incca-cliente-representante-grid',
  templateUrl: './cliente-representante-grid.component.html',
  styleUrls: ['./cliente-representante-grid.component.scss']
})
export class ClienteRepresentanteGridComponent extends BaseResourceGridComponent<ClienteRepresentante>  implements  OnInit {
  // basaeado em produtoComposicao
  @Input() clienteId: string;
  public dataCliente: Cliente[] = [];
  public clienteList: Cliente[] = [];
  public TipoRepresentanteList: Array<{ value: string, descricao: string }
  > = [
      { value: 'rep1', descricao: 'Representante' },
      { value: 'rep2', descricao: 'Representante 2' },
      { value: 'sup', descricao: 'Supervisor' },
      { value: 'gerR', descricao: 'Gerente Regional' },
    ];

  formGroup: FormGroup;
  constructor(
    protected injector: Injector,
    protected clienteRepresentanteService: ClienteRepresentanteService,
    public clienteService: ClienteService
    ) {
    super(injector, new ClienteRepresentante(), clienteRepresentanteService, createFormGroup);
  }
  public ngOnInit(): void {

    this.resourceService.getHelp(localStorage.getItem('Seguimento'), 'ClienteRepresentante').subscribe(res => this.helpList = res);
    this.resourceService.read(this.gridState, this.clienteId);
    this.view = this.resourceService.pipe(map(res => {return res;  }));
    this.clienteService.getAll().pipe(map(res => {
      if(res.data){
        return res.data.filter((item:Cliente) => item.ClienteTipoRepresentante === true )
      }
    })  ).subscribe(res => {
      this.clienteList = res;
      this.dataCliente = res;});
  }


  public saveHandler({ sender, rowIndex, formGroup, isNew }) {
    formGroup.get('ClienteId').setValue(this.clienteId);
    this.resource = ClienteRepresentante.fromJson(formGroup.value);
    this.resourceService.save(this.resource , isNew);
    sender.closeRow(rowIndex);
  }

  public removeHandler({ dataItem }) {
    this.resource = ClienteRepresentante.fromJson(dataItem);
    this.resourceService.remove(this.resource);
  }

  public getName(dataItem: ClienteRepresentante): string {
    return this.clienteList.length !== 0 ? this.clienteList.find(item =>
      item.ClienteId === dataItem.RepresentanteId).ClienteNome : 'carregando';
  }

  handleVariacaoFilter(value: string) {
    this.dataCliente = this.clienteList.filter((item) => item.ClienteNome.toLowerCase().indexOf(value.toLowerCase()) !== -1);
  }
}

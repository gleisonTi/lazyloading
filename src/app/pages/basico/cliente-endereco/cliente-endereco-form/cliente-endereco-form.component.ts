import { ClienteService } from './../../cliente/shared/cliente.service';
import { Component, OnInit, OnDestroy, DoCheck, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ClienteEnderecoService } from '../shared/cliente-endereco.service';
import { ClienteEndereco } from '../shared/cliente-endereco.model';
import { GlobalService } from 'src/app/shared/services/global.sevice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'incca-cliente-endereco-form',
  templateUrl: './cliente-endereco-form.component.html',
  styleUrls: ['./cliente-endereco-form.component.scss'],
  providers: [ClienteEnderecoService, GlobalService]
})
export class ClienteEnderecoFormComponent implements OnInit, OnDestroy, DoCheck {

  public inativo = false;
  public hasCleienteEndCod = false;
  public clienteEnderecoId = '';
  @Input() public isNew: boolean;
  @Input() public isNewCliente: boolean;
  @Input() public tipoCliente: boolean;
  @Input() public formGroup: FormGroup;
  @Output() public closeWindow = new EventEmitter<boolean>()
  @Output() public updateGrid = new EventEmitter<any>()

  public tipoEnderecoList = [{
    descricao: 'Cobrança', ClienteEnderecoTipo: 'ENDC'
  }, {
    descricao: 'Principal', ClienteEnderecoTipo: 'END'
  }, {
    descricao: 'Entrega', ClienteEnderecoTipo: 'ENDE'
  }]
  public created = false;
  // mascaras
  public maskCPF: string = "000.000.000-00";
  public maskCNPJ: string = "00.000.000/0000-00 ";
  public maskTelefone: string = "(00) 0000-0000";
  public maskCep: string = "00000-000";
  constructor(
    public clienteEnderecoService: ClienteEnderecoService,
    public globalService: GlobalService,
    public popupmessage: ToastrService,
    public clienteService: ClienteService,
  ) {
  }
  ngOnInit() {

    if (this.tipoCliente) {
      this.formGroup.controls['ClienteEnderecoCNPJ'].setValidators([Validators.required]);
    } else {
      this.formGroup.controls['ClienteEnderecoCPF'].setValidators([Validators.required]);
    }

  }

  ngOnDestroy() {
    this.formGroup = createFormGroup();
  }

  ngDoCheck(): void {
    // para edição da referência
    if (this.formGroup.value.ClienteEnderecoId !== '00000000-0000-0000-0000-000000000000') {
      this.clienteEnderecoId = this.formGroup.value.ClienteEnderecoId;
    }
  }

  salvarDados() {
    const clienteEndereco: ClienteEndereco = ClienteEndereco.fromJson(this.formGroup.value);

    if (!this.isNewCliente) {
      this.clienteEnderecoService.save(clienteEndereco, this.isNew).subscribe(res => {
        this.isNew = false
        this.formGroup.get('ClienteEnderecoId').setValue(res.ClienteEnderecoId)
        this.clienteEnderecoId = res.ClienteEnderecoId;
        this.created = true;
        this.updateGrid.emit('update');
        this.popupmessage.success("Endereço salvo com sucesso");
        this.closeWindow.emit(false);
      });
    } else {
      this.clienteService.setClienteEndereco(clienteEndereco);
      this.popupmessage.success("Endereço Salvo, crie o cadastro para gravar os dados");
      this.closeWindow.emit(false);
    }
  }

  cancelAction() {
    this.closeWindow.emit(false);
  }

  focusOutFunction(cep: string) {
    this.globalService.getAddresData(cep).subscribe(res => {
      if (res.erro) {
        this.popupmessage.warning("endereço não encontrado");
      }else{
        this.formGroup.get('ClienteEndereco').setValue(res.logradouro);
        this.formGroup.get('ClienteEnderecoBairro').setValue(res.bairro);
        this.formGroup.get('ClienteEnderecoCep').setValue(res.cep);
        this.formGroup.get('ClienteEnderecoCidade').setValue(res.localidade);
        this.formGroup.get('ClienteEnderecoCodigoMunicipio').setValue(res.ibge);
        this.formGroup.get('ClienteEnderecoPais').setValue('Brasil');
        this.formGroup.get('ClienteEnderecoUF').setValue(res.uf);
      }
    }, error => console.log(error));
  }


}

const createFormGroup = (dataItem?: ClienteEndereco) => {
  if (dataItem) {
    return new FormGroup({
      ClienteId: new FormControl(dataItem.ClienteId),
      ClienteEnderecoId: new FormControl(dataItem.ClienteEnderecoId),
      ClienteEndereco: new FormControl(dataItem.ClienteEndereco, Validators.required),
      ClienteEnderecoBairro: new FormControl(dataItem.ClienteEnderecoBairro, Validators.required),
      ClienteEnderecoCNPJ: new FormControl(dataItem.ClienteEnderecoCNPJ, Validators.required),
      ClienteEnderecoCPF: new FormControl(dataItem.ClienteEnderecoCPF, Validators.required),
      ClienteEnderecoCep: new FormControl(dataItem.ClienteEnderecoCep, Validators.required),
      ClienteEnderecoCidade: new FormControl(dataItem.ClienteEnderecoCidade, Validators.required),
      ClienteEnderecoCodigoMunicipio: new FormControl(dataItem.ClienteEnderecoCodigoMunicipio, Validators.required),
      ClienteEnderecoComplemento: new FormControl(dataItem.ClienteEnderecoComplemento, Validators.required),
      ClienteEnderecoInscricaoEstadual: new FormControl(dataItem.ClienteEnderecoInscricaoEstadual, Validators.required),
      ClienteEnderecoNumero: new FormControl(dataItem.ClienteEnderecoNumero, [Validators.required, Validators.pattern(/^-?([0-9]\d*)?$/)]),
      ClienteEnderecoPadrao: new FormControl(dataItem.ClienteEnderecoPadrao, Validators.required),
      ClienteEnderecoPais: new FormControl(dataItem.ClienteEnderecoPais, Validators.required),
      ClienteEnderecoSequencia: new FormControl(dataItem.ClienteEnderecoSequencia, Validators.required),
      ClienteEnderecoTelefone: new FormControl(dataItem.ClienteEnderecoTelefone, Validators.required),
      ClienteEnderecoTipo: new FormControl(dataItem.ClienteEnderecoTipo, Validators.required),
      ClienteEnderecoUF: new FormControl(dataItem.ClienteEnderecoUF, Validators.required),
    }
    );
  } else {
    return new FormGroup({
      ClienteId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteEnderecoId: new FormControl('00000000-0000-0000-0000-000000000000'),
      ClienteEndereco: new FormControl(''),
      ClienteEnderecoBairro: new FormControl('', Validators.required),
      ClienteEnderecoCNPJ: new FormControl(''),
      ClienteEnderecoCPF: new FormControl(''),
      ClienteEnderecoCep: new FormControl(''),
      ClienteEnderecoCidade: new FormControl('', Validators.required),
      ClienteEnderecoCodigoMunicipio: new FormControl(''),
      ClienteEnderecoComplemento: new FormControl(''),
      ClienteEnderecoInscricaoEstadual: new FormControl(''),
      ClienteEnderecoNumero: new FormControl('', Validators.required),
      ClienteEnderecoPadrao: new FormControl(false),
      ClienteEnderecoPais: new FormControl('', Validators.required),
      ClienteEnderecoSequencia: new FormControl('', Validators.required),
      ClienteEnderecoTelefone: new FormControl('', Validators.required),
      ClienteEnderecoTipo: new FormControl('', Validators.required),
      ClienteEnderecoUF: new FormControl('', Validators.required),
    });
  }
}


import { Component, OnInit, Input } from '@angular/core';
import { Cliente } from '../../../cliente/shared/cliente.model';
import { ClienteEndereco } from '../../../cliente-endereco/shared/cliente-endereco.model';
import { ClienteService } from '../../../cliente/shared/cliente.service';

@Component({
  selector: 'incca-show-pedido-cliente',
  templateUrl: './show-pedido-cliente.component.html',
  styleUrls: ['./show-pedido-cliente.component.scss']
})
export class ShowPedidoClienteComponent implements OnInit {

  @Input() public cliente: Cliente;
  @Input() public clienteEndereco: ClienteEndereco;
  constructor(public clienteService: ClienteService) {

  }

  ngOnInit() {
    if(this.cliente) {// se o cliente for valido
      this.clienteService.getClienteFull(this.cliente.ClienteId).subscribe(res=>{
        this.clienteEndereco = res.ClienteEnderecos.find((item: ClienteEndereco) => item.ClienteEnderecoTipo === 'END');
      });
    }

  }

}

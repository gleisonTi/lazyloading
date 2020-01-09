import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Authentication/authentication.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'incca-primeiro-acesso',
  templateUrl: './primeiro-acesso.html',
  styleUrls: ['./primeiro-acesso.scss'],
  //Foi adicionado esse style para retirar o botão de close do dialog para obrigar o usuário de alterar a senha do adm
  styles: [`
      >>> .k-window-actions.k-dialog-actions {
        display: none;
      }
    `]
})

export class PrimeiroAcessoComponent implements OnInit {

    opened: boolean = true;
    primeiroAcessoForm: FormGroup;
    loading = false;
    submitted: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

    this.primeiroAcessoForm = this.formBuilder.group({
      UsuarioSenha: ['', Validators.required],
      UsuarioConfirmacaoSenha: ['', Validators.required]
    });

  }

  get f() { return this.primeiroAcessoForm.controls; }

  onSubmit() {
    this.submitted = true

    if(this.primeiroAcessoForm.invalid || this.f.UsuarioSenha.value !== this.f.UsuarioConfirmacaoSenha.value){
      return
    }
  
    this.loading = true

    this.authenticationService.alteraSenhaAdministrador(this.f.UsuarioSenha.value)
    .pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((res) => { this.opened = false })
  }
}
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../Authentication/authentication.service';
import { GlobalService } from 'src/app/shared/services/global.sevice';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'incca-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})

export class RegistrarComponent implements OnInit {

  registrarForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    public globalService: GlobalService,
  ) {}

  ngOnInit() {
    this.registrarForm = this.formBuilder.group({

        EmpresaRazaoSocial: ['', Validators.required],
        EmpresaNomeFantasia: ['', Validators.required],
        EmpresaEndereco: ['', Validators.required],
        EmpresaCidade: ['', Validators.required],
        EmpresaBairro: ['', Validators.required],
        EmpresaEstado: ['', Validators.required],
        EmpresaCEP: ['', Validators.required],
        EmpresaTelefone: ['', Validators.required],
        EmpresaCNPJ: ['', Validators.required],
        EmpresaEmail: ['', Validators.required],
        EmpresaHabilitada: 1,
        EmpresaInscricao: ['']

    });
  }

  voltaTelaLogin(){
    this.router.navigate(['/login'])
  }

  procuraCep(event){
    if (event.target.value.length <= 8){
      return
    }else{
      this.globalService.getAddresData(this.registrarForm.get('EmpresaCEP').value)
        .subscribe((res) => {
          this.registrarForm.get('EmpresaCidade').setValue(res.localidade)
          this.registrarForm.get('EmpresaBairro').setValue(res.bairro)
          this.registrarForm.get('EmpresaEstado').setValue(res.uf)
        }
      )
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registrarForm.controls; }

  getTokenAdministrador(){
    this.authenticationService.login('administrador', 'administrador123')
    .subscribe((res) => {
      this.router.navigate(['/pedido'])
    })
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registrarForm.invalid) {
      return;
    }
    this.loading = true
    this.authenticationService.registrar(this.registrarForm.value)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((res) => {
        if(res !== ""){ //Cadastrou com sucesso então pode pegar token e encaminhar para tela de login
          this.getTokenAdministrador()
        }
      }
    )
  }
}
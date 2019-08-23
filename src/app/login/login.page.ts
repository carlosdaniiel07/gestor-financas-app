import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { AutenticacaoDTO } from '../models/autenticacao.dto';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../models/usuario.model';
import { ToastUtils } from '../utils/toast.utils';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private navController: NavController, 
              private menuController: MenuController, 
              private authService: AuthService,
              private fb: FormBuilder,
              private toast: ToastUtils) {
    this.initForm()
  }

  ngOnInit() {
    // Tenta efetuar um login 'automático', com base no login e senha armazenado no local storage
    if(this.authService.getCredenciais() !== null){
      this.login()
    }
  }

  ionViewWillEnter() {
    this.menuController.enable(false)
  }

  ionViewDidLeave() {
    this.menuController.enable(true)
  }

  login(): void {
    let credenciais: AutenticacaoDTO = { loginOuEmail: this.loginOuEmail.value, senha: this.senha.value }
    
    this.authService.login(credenciais).subscribe((response: HttpResponse<Usuario>) => {
      this.authService.successfulLogin(response)
      
      if(this.lembrarSenha.value){
        this.authService.salvaCredenciais(credenciais)
      }

      this.navController.navigateRoot('/home')
      this.toast.showToast(`Bem vindo(a), ${this.authService.getUsuarioLogado().nome.split(' ')[0]}!`, 2000)
    }, 
    (err: HttpErrorResponse) => {
      if(err.status === 403){
        this.toast.showToast('Usuário ou senha incorretos')
      } else {
        this.toast.showToast('Falha ao se comunicar com o servidor')
      }

      this.loginForm.reset()
    })
  }

  private initForm(): void {
    let credenciaisSalvas: AutenticacaoDTO = this.authService.getCredenciais()

    let loginOuEmail: string = (credenciaisSalvas !== null) ? credenciaisSalvas.loginOuEmail : ''
    let senha: string = (credenciaisSalvas !== null) ? credenciaisSalvas.senha : ''

    this.loginForm = this.fb.group({
      loginOuEmail: [loginOuEmail, Validators.required],
      senha: [senha, Validators.required],
      lembrarSenha: [true]
    })
  }

  get loginOuEmail() { return this.loginForm.get('loginOuEmail') }
  get senha() { return this.loginForm.get('senha') }
  get lembrarSenha() { return this.loginForm.get('lembrarSenha') }
}

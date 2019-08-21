import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../services/auth.service';

import { AutenticacaoDTO } from '../models/autenticacao.dto';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  loginForm: FormGroup

  constructor(private navController: NavController, 
              private menuController: MenuController, 
              private authService: AuthService,
              private fb: FormBuilder) {
    this.initForm()
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    //this.menuController.enable(false)
  }

  ionViewDidLeave() {
    //this.menuController.enable(true)
  }

  login(): void {
    let credenciais: AutenticacaoDTO = { loginOuEmail: this.loginOuEmail.value, senha: this.senha.value }
    this.authService.login(credenciais)
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      loginOuEmail: ['carlos.almeida', Validators.required],
      senha: ['123mudar', Validators.required]
    })
  }

  get loginOuEmail() { return this.loginForm.get('loginOuEmail') }
  get senha() { return this.loginForm.get('senha') }
}

import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Usuario } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-meu-perfil',
  templateUrl: './meu-perfil.component.html'
})
export class MeuPerfilComponent implements OnInit {

  constructor(private fb: FormBuilder, private authService: AuthService, private modalController: ModalController) {
    this.initForm()
  }

  atualizarUsuarioForm: FormGroup
  usuario: Usuario
  showCampoNovaSenha: boolean = false

  ngOnInit() {}

  closeModal(): void {
    this.modalController.dismiss()
  }

  ionViewWillEnter() {
    this.loadData()
  }

  setShowCampoNovaSenha(): void {
    // Implementação futura (possibilidade de alterar a senha)
    //this.showCampoNovaSenha = !this.showCampoNovaSenha
  }

  private initForm(): void {
    this.atualizarUsuarioForm = this.fb.group({
      novaSenha: ['', Validators.required]
    })
  }

  private loadData(): void {
    this.usuario = this.authService.getUsuarioLogado()
    this.usuario.tipo = Usuario.transformTipo(this.usuario.tipo)
  }
}

import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController, ModalController } from '@ionic/angular';
import { MeuPerfilComponent } from './meu-perfil/meu-perfil.component';
import { ConfigPageComponent } from './config-page/config-page.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  constructor(private authService: AuthService, private navController: NavController, private modalController: ModalController) {
  }

  logout(): void {
    this.authService.logout()
  }

  meuPerfil(): void {
    this.modalController.create({
      component: MeuPerfilComponent,
    }).then((modal) => modal.present())
  }

  showConfigPage(): void {
    this.modalController.create({
      component: ConfigPageComponent
    }).then((modal) => modal.present())
  }
}

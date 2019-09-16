import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html'
})
export class HomePage {

  constructor(private authService: AuthService, private navController: NavController) {
  }

  logout(): void {
    this.authService.logout()
    this.navController.navigateRoot('/login')
  }
}

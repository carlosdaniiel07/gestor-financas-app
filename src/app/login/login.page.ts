import { Component, OnInit } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html'
})
export class LoginPage implements OnInit {

  constructor(private navController: NavController, private menuController: MenuController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.menuController.enable(false)
  }

  ionViewDidLeave() {
    this.menuController.enable(true)
  }

  login(): void {
    this.navController.navigateForward('/home')
  }
}

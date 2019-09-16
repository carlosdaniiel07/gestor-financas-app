import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { MenuOtherOptionsComponent } from './menu-other-options/menu-other-options.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  appPages: {title: string, url: string, icon: string}[] = [
    { title: 'Home', url: 'home', icon: 'home' },
    { title: 'Movimentos', url: 'movimentos', icon: 'list' },
    { title: 'Cartões', url: 'cartoes', icon: 'card' }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private popoverController: PopoverController
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  isLogado(): boolean {
    return this.authService.isLogado()
  }

  showOtherOptions(ev: any): void {
    this.popoverController.create({
      component: MenuOtherOptionsComponent,
      event: ev
    }).then((popover) => popover.present())
  }
}

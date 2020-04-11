import { Component } from '@angular/core';

import { Platform, PopoverController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { MenuOtherOptionsComponent } from './menu-other-options/menu-other-options.component';

import { FCM, NotificationData } from '@ionic-native/fcm/ngx'
import { ToastUtils } from './utils/toast.utils';
import { NotificationService } from './services/notification.service';

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
    private popoverController: PopoverController,
    private toast: ToastUtils,
    private notificationService: NotificationService,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.initFirebaseMessaging();
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

  private initFirebaseMessaging(): void {
    this.fcm.onNotification().subscribe((notification: NotificationData) => {
      const isBackground: boolean = notification.wasTapped

      if (!isBackground) {
        this.toast.showInfoToast(notification.body, 0, true)
      }

      // Marca notificação como recebida..
      this.notificationService.markAsReceived(Number.parseInt(notification.id)).subscribe()
    })
  }
}

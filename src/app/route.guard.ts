import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, ActivatedRouteSnapshot, Route } from '@angular/router';
import { AuthService } from './services/auth.service';
import { NavController } from '@ionic/angular';
import { ToastUtils } from './utils/toast.utils';

@Injectable()
export class RouteGuard implements CanLoad, CanActivate {
    
    constructor(private authService: AuthService, private navController: NavController, private toast: ToastUtils) { }

    canLoad(route: Route): boolean {
        return this.handle(route.path)
    }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        return this.handle(route.routeConfig.path)
    }

    private handle(currentRoute: string): boolean {
        if(this.authService.isLogado()) {
            return true
        } else {
            this.toast.showToast('Você não está logado')
            this.navController.navigateRoot('/login')
            
            return false
        }
    }
}
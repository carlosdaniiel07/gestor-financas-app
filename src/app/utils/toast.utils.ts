import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastUtils {

    constructor(private toastController: ToastController) { }

    public showToast(message: string, duration: number = 2000, showCloseButton: boolean = true): void {
        this.toastController.create({
            color: 'dark',
            message: message,
            duration: duration,
            showCloseButton: showCloseButton
        }).then((toast) => toast.present())
    }
    
    public showInfoToast(message: string, duration: number = 2000, showCloseButton: boolean = true): void {
        this.toastController.create({
            color: 'primary',
            message: message,
            duration: duration,
            showCloseButton: showCloseButton
        }).then((toast) => toast.present())
    }

    public showErrorToast(message: string, duration: number = 2000, showCloseButton: boolean = true): void {
        this.toastController.create({
            color: 'danger',
            message: message,
            duration: duration,
            showCloseButton: showCloseButton
        }).then((toast) => toast.present())
    }
}
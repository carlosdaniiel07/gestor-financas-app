import { ToastController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable()
export class ToastUtils {

    constructor(private toastController: ToastController) { }

    public showToast(message: string, duration: number = 2000): void {
        this.toastController.create({
            message: message,
            duration: duration,
        }).then((toast) => toast.present())
    }
}
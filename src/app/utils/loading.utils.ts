import { LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingUtils {

    constructor(private loadingController: LoadingController) {        
    }

    public showLoading(message: string = 'Carregando..', spinnerType: any = 'crescent'): void {
        loadingController.create({
            message: message,
            spinner: spinnerType,
            showBackdrop: false
        }).then((loading) => loading.present())
    }

    public dismissLoading(): void {
        loadingController.dismiss()
    }
}
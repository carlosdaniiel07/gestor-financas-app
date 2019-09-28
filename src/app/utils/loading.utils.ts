import { LoadingController } from '@ionic/angular';
import { loadingController } from '@ionic/core';
import { Injectable } from '@angular/core';

@Injectable()
export class LoadingUtils {

    constructor(private loadingController: LoadingController) {        
    }

    public showLoading(loadingId: string, message: string = 'Carregando..', spinnerType: any = 'crescent'): void {
        loadingController.create({
            id: loadingId,
            message: message,
            spinner: spinnerType,
            showBackdrop: false
        }).then((loading) => loading.present())
    }

    public dismissLoading(loadingId: string): void {
        loadingController.dismiss(loadingId)
    }
}
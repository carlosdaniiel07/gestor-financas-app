import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { APP_CONFIG } from 'src/app/app.config';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html'
})
export class ConfigPageComponent implements OnInit {
  
  modal: boolean = true

  constructor(private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {}

  closeModal(): void {
    this.modalController.dismiss()
  }

  setNovaChaveHgBrasil(): void {
    this.alertController.create({
      header: 'Novo valor',
      inputs: [
        { name: 'novaChave', type: 'text', value: APP_CONFIG.externalsApis.hgBrasil.key, placeholder: 'Nova chave' }
      ],
      buttons: [
        { text: 'Cancelar' },
        { text: 'Salvar', handler: (inputData) => {
          localStorage.setItem(APP_CONFIG.externalsApis.hgBrasil.localStorageAddress, inputData.novaChave)
          APP_CONFIG.externalsApis.hgBrasil.key = inputData.novaChave
        }}
      ]
    }).then((alert) => alert.present())
  }
}

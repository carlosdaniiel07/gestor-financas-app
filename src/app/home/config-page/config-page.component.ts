import { Component, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { APP_CONFIG } from 'src/app/app.config';
import { HistoricoJobsComponent } from './historico-jobs/historico-jobs.component';
import { TaskService } from 'src/app/services/task.service';
import { LoadingUtils } from 'src/app/utils/loading.utils';
import { Task } from 'src/app/models/task.model';

@Component({
  selector: 'app-config-page',
  templateUrl: './config-page.component.html'
})
export class ConfigPageComponent implements OnInit {
  
  modal: boolean = true

  constructor(private modalController: ModalController, private alertController: AlertController, private taskService: TaskService, private loading: LoadingUtils) { }

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

  showHistoricoJobs(): void {
    this.loading.showLoading('Recuperando dados..')

    this.taskService.getAll().subscribe((dados: Task[]) => {
      this.loading.dismissLoading()

      this.modalController.create({
        component: HistoricoJobsComponent,
        componentProps: {
          'tasks': dados
        }
      }).then((modal) => modal.present())
    })
  }
}

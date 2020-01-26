import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { ModalController, AlertController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-historico-jobs',
  templateUrl: './historico-jobs.component.html'
})
export class HistoricoJobsComponent implements OnInit {

  modal: boolean = true
  @Input() tasks: Task[] = []

  constructor(private modalController: ModalController, private alertController: AlertController, private taskService: TaskService, private toast: ToastUtils) { }

  ngOnInit() {}

  closeModal(): void {
    this.modalController.dismiss()
  }

  executar(task: Task): void {
    this.alertController.create({
      header: 'Atenção',
      message: `Deseja realmente executar o job <strong>${task.nome}</strong>?`,
      buttons: [
        { text: 'Cancelar' },
        { text: 'Confirmar', handler: () => {
          this.taskService.executa(task.nome).subscribe(() => this.toast.showToast('Job executado com sucesso'))
        }}
      ]
    }).then((alert) => alert.present())
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Task, sortByDataExecucaoDesc } from 'src/app/models/task.model';
import { ModalController, AlertController } from '@ionic/angular';
import { TaskService } from 'src/app/services/task.service';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { DateUtils } from 'src/app/utils/date.utils';

@Component({
  selector: 'app-historico-jobs',
  templateUrl: './historico-jobs.component.html'
})
export class HistoricoJobsComponent implements OnInit {

  modal: boolean = true
  showSomenteHoje: boolean = false

  @Input() tasks: Task[] = []
  tasksVisiveis: Task[] = []

  constructor(private modalController: ModalController, private alertController: AlertController, private taskService: TaskService, private toast: ToastUtils) { }

  ngOnInit() {}

  ionViewWillEnter() {
   this.tasks = this.tasks.sort(sortByDataExecucaoDesc) 
   this.tasksVisiveis = this.tasks
  }

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

  onFiltroChanges(event: any): void {
    this.showSomenteHoje = !this.showSomenteHoje

    if (this.showSomenteHoje) {
      let today = DateUtils.toApiPattern(DateUtils.getNowAsJson())
      this.tasksVisiveis = this.tasks.filter((task: Task) => DateUtils.toApiPattern(task.dataExecucao) == today)
    } else {
      this.tasksVisiveis = this.tasks
    }   
  }
}

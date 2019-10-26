import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Transferencia } from 'src/app/models/transferencia.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-transferencia',
  templateUrl: './lista-transferencia.component.html'
})
export class ListaTransferenciaComponent implements OnInit {

  @Input() transferencias: Transferencia[] = []

  @Output() editarEvent = new EventEmitter<Transferencia>()
  @Output() efetivarEvent = new EventEmitter<Transferencia>()
  @Output() estornarEvent = new EventEmitter<Transferencia>()

  constructor(private toast: ToastUtils, private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {}

  openOptionsDialog(transferencia: Transferencia): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(transferencia)},
        {text: 'Efetivar', icon: 'checkmark', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: 'Deseja realmente efetivar a transferência?',
            buttons: [
              { text: 'Não' },
              { text: 'Sim', handler: () => this.efetivarEvent.emit(transferencia) }
            ]
          }).then(alert => alert.present())
        }},
        {text: 'Estornar', icon: 'undo', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: 'Deseja realmente estornar a transferência?',
            buttons: [
              { text: 'Não' },
              { text: 'Sim', handler: () => this.estornarEvent.emit(transferencia) }
            ]
          }).then(alert => alert.present())
        }},
      ]
    }).then((action) => action.present())
  }

  showTarifa(transferencia: Transferencia): void {
    this.toast.showToast(`Tarifa: ${transferencia.taxa.toFixed(2)}`)
  }

  transformStatus(transferencia: Transferencia): string {
    return Transferencia.transformStatus(transferencia.status)
  }

  getValorTotal(transferencia: Transferencia): number {
    return Transferencia.getValorTotal(transferencia)
  }

  isEfetivado(transferencia): boolean {
    return Transferencia.isEfetivado(transferencia)
  }

  isEstornado(transferencia: Transferencia): boolean {
    return Transferencia.isEstornado(transferencia)
  }

  isAgendado(transferencia: Transferencia): boolean {
    return Transferencia.isAgendado(transferencia)
  }
}

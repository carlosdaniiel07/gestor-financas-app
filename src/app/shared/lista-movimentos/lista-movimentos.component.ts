import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { Movimento } from 'src/app/models/movimento.model';

@Component({
  selector: 'app-lista-movimentos',
  templateUrl: './lista-movimentos.component.html',
  styleUrls: ['./lista-movimentos.component.scss'],
})
export class ListaMovimentosComponent implements OnInit {

  @Input() modal: boolean = false
  @Input() movimentos: Movimento[] = []

  @Output() detalhesEventEmitter = new EventEmitter<Movimento>()
  @Output() editarEventEmitter = new EventEmitter<Movimento>()
  @Output() removerEventEmitter = new EventEmitter<Movimento>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController, private modalController: ModalController) { }

  ngOnInit() { }

  closeModal(): void {
    if(this.modal){
      this.modalController.dismiss()
    }
  }

  isCredito(movto: Movimento): boolean {
    return Movimento.isCredito(movto)
  }

  isEfetivado(movto: Movimento): boolean {
    return Movimento.isEfetivado(movto)
  }

  hasCartaoCredito(movto: Movimento): boolean {
    return Movimento.hasCartaoCredito(movto)
  }

  hasCategoria(movto: Movimento): boolean {
    return Movimento.hasCategoria(movto)
  }

  hasMovimentos(): boolean {
    return this.movimentos.length !== 0
  }

  openOptionsDialog(movto: Movimento): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        { text: 'Detalhes', icon: 'eye', handler: () => this.detalhesEventEmitter.emit(movto) },
        { text: 'Editar', icon: 'create', handler: () => this.editarEventEmitter.emit(movto) },
        {
          text: 'Remover', icon: 'trash', handler: () => {
            this.alertController.create({
              header: 'Confirmar',
              message: 'Deseja realmente excluir este movimento?',
              buttons: [
                { text: 'Não' },
                { text: 'Sim', handler: () => this.removerEventEmitter.emit(movto) }
              ]
            }).then(alert => alert.present())
          }
        }
      ]
    }).then((actionSheet) => actionSheet.present())
  }
}

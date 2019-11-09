import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Movimento } from 'src/app/models/movimento.model';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html'
})
export class ListaComponent implements OnInit {

  @Input() movimentos: Movimento[]

  @Output() detalhesEventEmitter = new EventEmitter<Movimento>()
  @Output() editarEventEmitter = new EventEmitter<Movimento>()
  @Output() removerEventEmitter = new EventEmitter<Movimento>()
  @Output() clonarEventEmitter = new EventEmitter<Movimento>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() { }

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

  hasConta(movto: Movimento): boolean {
    return Movimento.hasConta(movto)
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
        },
        { text: 'Clonar', icon: 'copy', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: 'Deseja realmente clonar este movimento? Um movimento idêntico será gerado com a data de hoje',
            buttons: [
              { text: 'Não' },
              { text: 'Sim', handler: () => this.clonarEventEmitter.emit(movto) }
            ]
          }).then(alert => alert.present())
        }},
      ]
    }).then((actionSheet) => actionSheet.present())
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cartao } from 'src/app/models/cartao.model';
import { ActionSheetController, ModalController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-cartoes',
  templateUrl: './lista-cartoes.component.html'
})
export class ListaCartoesComponent implements OnInit {
  
  @Input() cartoes: Cartao[] = [] 

  @Output() editarEvent = new EventEmitter<Cartao>()
  @Output() removerEvent = new EventEmitter<Cartao>()
  @Output() showFaturasEvent = new EventEmitter<Cartao>()
  @Output() showMovimentosEvent = new EventEmitter<Cartao>()

  constructor(private actionSheetController: ActionSheetController, private modalController: ModalController, private alertController: AlertController) { }

  ngOnInit() {}

  openOptionsDialog(cartao: Cartao): void {
    this.actionSheetController.create({
      header: 'Escolha uma ação',
      buttons: [
        {text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(cartao)},
        {text: 'Remover', icon: 'trash', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: `Deseja realmente excluir o cartão ${cartao.nome}?`,
            buttons: [
              { text: 'Não' },
              { text: 'Sim', handler: () => this.removerEvent.emit(cartao) }
            ]
          }).then((alert) => alert.present())
        }},
        {text: 'Faturas', icon: 'document', handler: () => this.showFaturasEvent.emit(cartao)},
        {text: 'Movimentos', icon: 'list', handler: () => this.showMovimentosEvent.emit(cartao)}
      ]
    }).then((actionSheet) => actionSheet.present())
  }
}

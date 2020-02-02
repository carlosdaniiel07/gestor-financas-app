import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Corretora } from 'src/app/models/corretora.model';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-corretoras',
  templateUrl: './lista-corretoras.component.html'
})
export class ListaCorretorasComponent implements OnInit {

  @Input() corretoras: Corretora[] = []

  // @Output() editarEvent = new EventEmitter<Corretora>()
  @Output() removerEvent = new EventEmitter<Corretora>()
  // @Output() showMovimentosEvent = new EventEmitter<Corretora>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {}

  openOptionsDialog(corretora: Corretora): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        // {text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(corretora)},
        {text: 'Remover', icon: 'trash', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: `Deseja realmente excluir a corretora ${corretora.nome}?`,
            buttons: [
              { text: 'Não' },
              { text: 'Sim', handler: () => this.removerEvent.emit(corretora) }
            ]
          }).then(alert => alert.present())
        }},
        // {text: 'Movimentos', icon: 'list', handler: () => this.showMovimentosEvent.emit(corretora)},
      ]
    }).then((action) => action.present())
  }
}

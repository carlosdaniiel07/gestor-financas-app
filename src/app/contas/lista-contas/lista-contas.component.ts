import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Conta } from 'src/app/models/conta.model';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-lista-contas',
  templateUrl: './lista-contas.component.html'
})
export class ListaContasComponent implements OnInit {

  @Input() contas: Conta[] = []

  @Output() editarEvent = new EventEmitter<Conta>()
  @Output() showMovimentosEvent = new EventEmitter<Conta>()

  constructor(private actionSheet: ActionSheetController, private modalController: ModalController) { }

  ngOnInit() {}

  isSaldoPositivo(conta: Conta): boolean {
    return conta.saldo > 0
  }

  openOptionsDialog(conta: Conta): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(conta)},
        {text: 'Movimentos', icon: 'list', handler: () => this.showMovimentosEvent.emit(conta)},
      ]
    }).then((action) => action.present())
  }
}

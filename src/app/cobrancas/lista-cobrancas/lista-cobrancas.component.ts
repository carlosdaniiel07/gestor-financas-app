import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cobranca } from 'src/app/models/cobranca.model';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-cobrancas',
  templateUrl: './lista-cobrancas.component.html'
})
export class ListaCobrancasComponent implements OnInit {

  @Input() cobrancas: Cobranca[]

  @Output() detalhesEvent = new EventEmitter<Cobranca>()
  @Output() editarEvent = new EventEmitter<Cobranca>()
  @Output() removerEvent = new EventEmitter<Cobranca>()
  @Output() verOperacoesEvent = new EventEmitter<Cobranca>()
  @Output() pagarEvent = new EventEmitter<Cobranca>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {}

  transformStatus(cobranca: Cobranca): string {
    return Cobranca.transformStatus(cobranca.status)
  }

  isPago(cobranca: Cobranca): boolean {
    return Cobranca.isPago(cobranca)
  }

  getValorTotal(cobranca: Cobranca): number {
    return Cobranca.getValorTotal(cobranca)
  }

  openOptionsDialog(cobranca: Cobranca): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Detalhes', icon: 'eye', handler: () => this.detalhesEvent.emit(cobranca)},
        {text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(cobranca)},
        {text: 'Remover', icon: 'trash', handler: () => this.removerEvent.emit(cobranca)},
       // {text: 'Operações', icon: 'list', handler: () => this.verOperacoesEvent.emit(cobranca)},
        {text: 'Pagar', icon: 'cash', handler: () => this.pagarEvent.emit(cobranca)}
      ]
    }).then((action) => action.present())
  }
}

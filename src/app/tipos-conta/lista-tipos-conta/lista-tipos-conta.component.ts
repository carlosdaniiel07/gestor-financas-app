import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TipoConta } from 'src/app/models/tipo-conta.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-tipos-conta',
  templateUrl: './lista-tipos-conta.component.html'
})
export class ListaTiposContaComponent implements OnInit {

  @Input() tiposConta: TipoConta[] = []

  @Output() editarTipoContaEvent = new EventEmitter<TipoConta>()
  @Output() removerTipoContaEvent = new EventEmitter<TipoConta>()

  constructor(private alertController: AlertController) { }

  ngOnInit() { }

  editar(tipoConta: TipoConta): void {
    this.editarTipoContaEvent.emit(tipoConta)
  }

  remover(tipoConta: TipoConta): void {
    this.alertController.create({
      header: 'Confirmar',
      message: `Deseja realmente excluir o tipo ${tipoConta.nome}?`,
      buttons: [
        { text: 'Não' },
        { text: 'Sim', handler: () => this.removerTipoContaEvent.emit(tipoConta) }
      ]
    }).then(alert => alert.present())
  }
}

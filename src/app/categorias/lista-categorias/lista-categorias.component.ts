import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html'
})
export class ListaCategoriasComponent implements OnInit {

  @Input() categorias: Categoria[] = []
  @Input() header: string = ''

  @Output() detalhesEventEmitter = new EventEmitter<Categoria>()
  @Output() editarEventEmitter = new EventEmitter<Categoria>()
  @Output() removerEventEmitter = new EventEmitter<Categoria>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() { }

  isCredito(categoria: Categoria): boolean {
    return Categoria.isCredito(categoria)
  }

  openOptionsDialog(categoria: Categoria): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Detalhes', icon: 'eye', handler: () => this.detalhesEventEmitter.emit(categoria) },
        {text: 'Editar', icon: 'create', handler: () => this.editarEventEmitter.emit(categoria)},
        {text: 'Remover', icon: 'trash', handler: () => {
          this.alertController.create({
            header: 'Confirmar',
            message: `Deseja realmente excluir a categoria ${categoria.nome}?`,
            buttons: [
              {text: 'Não'},
              {text: 'Sim', handler: () => this.removerEventEmitter.emit(categoria)}
            ]
          }).then(alert => alert.present())
        }}
      ]
    }).then((actionSheet) => actionSheet.present())
  }
}

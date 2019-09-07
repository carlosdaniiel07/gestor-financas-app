import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';

import { Subcategoria } from 'src/app/models/subcategoria.model';
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-lista-subcategorias',
  templateUrl: './lista-subcategorias.component.html'
})
export class ListaSubcategoriasComponent implements OnInit {

  @Input() subcategorias: Subcategoria[] = []
  @Input() header: string = ''

  @Output() detalhesEventEmitter = new EventEmitter<Subcategoria>()
  @Output() editarEventEmitter = new EventEmitter<Subcategoria>()
  @Output() removerEventEmitter = new EventEmitter<Subcategoria>()
  @Output() showMovimentosEventEmitter = new EventEmitter<Subcategoria>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() { }

  openOptionsDialog(subcategoria: Subcategoria): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        { text: 'Detalhes', icon: 'eye', handler: () => this.detalhesEventEmitter.emit(subcategoria) },
        { text: 'Editar', icon: 'create', handler: () => this.editarEventEmitter.emit(subcategoria) },
        {
          text: 'Remover', icon: 'trash', handler: () => {
            this.alertController.create({
              header: 'Confirmar',
              message: `Deseja realmente excluir a subcategoria ${subcategoria.nome}?`,
              buttons: [
                { text: 'Não' },
                { text: 'Sim', handler: () => this.removerEventEmitter.emit(subcategoria) }
              ]
            }).then(alert => alert.present())
          }
        },
        {text: 'Movimentos', icon: 'list', handler: () => this.showMovimentosEventEmitter.emit(subcategoria) }
      ]
    }).then((actionSheet) => actionSheet.present())
  }

  isCredito(categoria: Categoria): boolean {
    return Categoria.isCredito(categoria)
  }
}

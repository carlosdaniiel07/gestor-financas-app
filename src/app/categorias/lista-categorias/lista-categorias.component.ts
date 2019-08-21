import { Component, OnInit, Input } from '@angular/core';
import { Categoria } from 'src/app/models/categoria.model';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-lista-categorias',
  templateUrl: './lista-categorias.component.html'
})
export class ListaCategoriasComponent implements OnInit {

  @Input() categorias: Categoria[] = []
  @Input() header: string = ''

  constructor(private actionSheet: ActionSheetController) { }

  ngOnInit() { }

  isCredito(categoria: Categoria): boolean {
    return Categoria.isCredito(categoria)
  }

  openActionDialog(categoria: Categoria): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Detalhes', handler: () => console.log(categoria) },
        {text: 'Editar'},
        {text: 'Remover'}
      ]
    }).then((actionSheet) => actionSheet.present())
  }
}

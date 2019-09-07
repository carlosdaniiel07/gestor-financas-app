import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Projeto } from 'src/app/models/projeto.model';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-projetos',
  templateUrl: './lista-projetos.component.html'
})
export class ListaProjetosComponent implements OnInit {

  @Input() projetos: Projeto[] = []

  @Output() detalhesEvent = new EventEmitter<Projeto>()
  @Output() editarEvent = new EventEmitter<Projeto>()
  @Output() removerEvent = new EventEmitter<Projeto>()
  @Output() showMovimentosEvent = new EventEmitter<Projeto>()

  constructor(private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() { }

  hasDataFinal(projeto: Projeto): boolean {
    return Projeto.hasDataFinal(projeto)
  }

  transformStatus(projetoStatus: string): string {
    return Projeto.transformStatus(projetoStatus)
  }

  openOptionsDialog(projeto: Projeto): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        { text: 'Detalhes', icon: 'eye', handler: () => this.detalhesEvent.emit(projeto) },
        { text: 'Editar', icon: 'create', handler: () => this.editarEvent.emit(projeto) },
        {
          text: 'Remover', icon: 'trash', handler: () => {
            this.alertController.create({
              header: 'Confirmar',
              message: `Deseja realmente excluir o projeto ${projeto.nome}?`,
              buttons: [
                { text: 'Não' },
                { text: 'Sim', handler: () => this.removerEvent.emit(projeto) }
              ]
            }).then((alert) => alert.present())
          }
        },
        { text: 'Movimentos', icon: 'list', handler: () => this.showMovimentosEvent.emit(projeto) },
      ]
    }).then((action) => action.present())
  }
}

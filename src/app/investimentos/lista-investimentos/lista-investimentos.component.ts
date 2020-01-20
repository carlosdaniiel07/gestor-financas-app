import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Investimento } from 'src/app/models/investimento.model';
import { ItemInvestimento } from 'src/app/models/item-investimento.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { ActionSheetController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-lista-investimentos',
  templateUrl: './lista-investimentos.component.html'
})
export class ListaInvestimentosComponent implements OnInit {

  @Input() investimentos: Investimento[] = []
  investimentosComItensVisiveis: Investimento[] = []

  @Output() aplicacaoEvent = new EventEmitter<Investimento>()
  @Output() resgateEvent = new EventEmitter<Investimento>()
  @Output() atualizarValorAtualEvent = new EventEmitter<Investimento>()

  constructor(private toast: ToastUtils, private actionSheet: ActionSheetController, private alertController: AlertController) { }

  ngOnInit() {}

  openOptionsDialog(investimento: Investimento): void {
    this.actionSheet.create({
      header: 'Escolha uma opção',
      buttons: [
        {text: 'Aplicação', icon: 'arrow-round-up', handler: () => this.aplicacaoEvent.emit(investimento)},
        {text: 'Resgate', icon: 'arrow-round-down', handler: () => this.resgateEvent.emit(investimento)},
        {text: 'Atualizar valor atual', icon: 'refresh', handler: () => this.atualizarValorAtualEvent.emit(investimento)},
      ]
    }).then((action) => action.present())
  }

  getRendimentoAtual(investimento: Investimento): number {
    return Investimento.getRendimentoAtual(investimento)
  }

  hasResgate(investimento: Investimento): boolean {
    return Investimento.hasResgate(investimento)
  }

  showItens(investimento: Investimento): void {
    if(!this.hasItensVisible(investimento)) {
      this.investimentosComItensVisiveis.push(investimento)
    } else {
      this.investimentosComItensVisiveis.splice(this.investimentosComItensVisiveis.indexOf(investimento), 1)
    }
  }
  
  hasItensVisible(investimento: Investimento): boolean {
    return this.investimentosComItensVisiveis.indexOf(investimento) !== -1
  }

  isAplicacao(item: ItemInvestimento): boolean {
    return ItemInvestimento.isAplicacao(item)
  }

  showDetalhesValor(item: ItemInvestimento): void {
    let rendimentoLiquido = item.rendimento - ItemInvestimento.getImpostos(item) - item.outrasTaxas
    let message = ''

    message += `<strong>Valor:</strong> ${item.valor.toFixed(2)} <br/>`
    message += `<strong>IR:</strong> ${item.ir.toFixed(2)} <br/>`
    message += `<strong>IOF:</strong> ${item.iof.toFixed(2)} <br/>`
    message += `<strong>Outras taxas:</strong> ${item.outrasTaxas.toFixed(2)} <br/>`
    message += `<strong>Rendimento:</strong> ${item.rendimento.toFixed(2)} <br/>`
    message += `<strong>Rendimento líquido:</strong> ${rendimentoLiquido.toFixed(2)}`

    this.alertController.create({
      header: 'Detalhes',
      message: message,
      buttons: [
        { text: 'Ok' }
      ]
    }).then((alert) => alert.present())
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Investimento } from 'src/app/models/investimento.model';
import { ItemInvestimento } from 'src/app/models/item-investimento.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-lista-investimentos',
  templateUrl: './lista-investimentos.component.html'
})
export class ListaInvestimentosComponent implements OnInit {

  @Input() investimentos: Investimento[] = []
  investimentosComItensVisiveis: Investimento[] = []

  constructor(private toast: ToastUtils) { }

  ngOnInit() {}

  openOptionsDialog(investimento: Investimento): void {

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
    let rendimentos = item.rendimento
    let impostos = ItemInvestimento.getImpostos(item)

    this.toast.showToast(`Rendimento: ${rendimentos.toFixed(2)} - Impostos: ${impostos.toFixed(2)}`)
  }
}

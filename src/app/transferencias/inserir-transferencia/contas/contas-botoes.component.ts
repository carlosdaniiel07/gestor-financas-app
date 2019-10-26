import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Conta } from 'src/app/models/conta.model';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-contas-botoes',
  templateUrl: './contas-botoes.component.html',
})
export class ContasBotoesComponent implements OnInit {
  contaOrigem: Conta = null
  contaDestino: Conta = null
  textoInformativo: string = 'Escolha a conta de origem'

  @Input() contas: Conta[]

  @Output() contaSelecionadaEvent = new EventEmitter<Conta>()

  constructor(private toast: ToastUtils) { }

  ngOnInit() { }

  selecionarConta(conta: Conta): void {
    if (conta !== this.contaOrigem && conta !== this.contaDestino) {
      if (this.contaOrigem === null) {
        this.contaOrigem = conta
        this.textoInformativo = 'Escolha a conta de destino'
      } else {
        this.contaDestino = conta
      }

      this.contaSelecionadaEvent.emit(conta)
    }
  }

  detalhesConta(conta: Conta): void {
    let msg: string = `Saldo da conta ${conta.nome}: ${conta.saldo.toFixed(2)}`
    this.toast.showToast(msg)
  }

  getBotaoColor(conta): string {
    let color: string = ''

    if (conta === this.contaOrigem) {
      color = 'danger'
    }

    if (conta === this.contaDestino) {
      color = 'success'
    }

    return color
  }
}

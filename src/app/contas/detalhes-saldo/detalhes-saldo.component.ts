import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Movimento } from 'src/app/models/movimento.model';
import { Fatura } from 'src/app/models/fatura.model';
import { Cobranca } from 'src/app/models/cobranca.model';
import { CobrancaService } from 'src/app/services/cobranca.service';
import { MovimentoService } from 'src/app/services/movimento.service';
import { FaturaService } from 'src/app/services/fatura.service';
import { DateUtils } from 'src/app/utils/date.utils';
import { SaldoItemDTO } from 'src/app/models/saldo-item.dto';

@Component({
  selector: 'app-detalhes-saldo',
  templateUrl: './detalhes-saldo.component.html'
})
export class DetalhesSaldoComponent implements OnInit {

  hasData: boolean = false
  dados: { cobrancas: SaldoItemDTO[], movimentos: SaldoItemDTO[], faturas: SaldoItemDTO[] } = { cobrancas: undefined, movimentos: undefined, faturas: undefined }
  saldoFuturo: number = 0

  constructor(
    private modalController: ModalController,
    private cobrancaService: CobrancaService,
    private movimentoService: MovimentoService,
    private faturaService: FaturaService
  ) { }

  ngOnInit() { }

  ionViewWillEnter() {
    this.loadData()
  }

  closeModal(): void {
    this.modalController.dismiss()
  }

  loadData(): void {
    const { minDate, maxDate } = DateUtils.getMonthRange(DateUtils.getMomentMonth(), DateUtils.getYear())

    this.cobrancaService.getAllByPeriodo(minDate, maxDate).toPromise()
      .then((cobrancas: Cobranca[]) => {
        this.dados.cobrancas = cobrancas.map(c => {
          return {
            descricao: c.descricao,
            data: Cobranca.isPago(c) ? c.dataPagamento : c.dataVencimento,
            valor: Cobranca.getValorTotal(c),
            obs: `Beneficiário: ${c.beneficiario.nome}`,
            isCredito: false,
            isEfetivado: Cobranca.isPago(c)
          }
        })

        return this.movimentoService.getAllByPeriodo(minDate, maxDate).toPromise()
      })
      .then((movimentos: Movimento[]) => {
        this.dados.movimentos = movimentos.filter(m => {
          return !Movimento.hasCartaoCredito(m) && !Movimento.isCobranca(m) 
            && (!Movimento.hasConta(m) || (Movimento.hasConta(m) && m.conta.compoemSaldo))
        })
        .map(m => {
          return {
            descricao: m.descricao,
            data: m.dataContabilizacao,
            valor: m.valorTotal,
            obs: Movimento.hasConta(m) ? `Conta: ${m.conta.nome}` : '',
            isCredito: Movimento.isCredito(m),
            isEfetivado: Movimento.isEfetivado(m)
          }
        })

        return this.faturaService.getAllByPeriodo(minDate, maxDate).toPromise()
      })
      .then((faturas: Fatura[]) => {
        this.dados.faturas = faturas.map(f => {
          return {
            descricao: f.referencia,
            data: f.vencimento,
            valor: f.valor,
            obs: `Cartão: ${f.cartao.nome}`,
            isCredito: false,
            isEfetivado: Fatura.isPago(f)
          }
        })

        this.saldoFuturo = this.calculaSaldoFuturo()
        this.hasData = true
      })
  }

  isCredito(movimento: Movimento): boolean {
    return Movimento.isCredito(movimento)
  }

  /**
   * Realiza o cálculo do saldo futuro, baseando-se nas cobranças, nos movimentos e nas faturas
   */
  private calculaSaldoFuturo(): number {
    let saldoFuturo: number = 0
    const dadosConsolidados = this.dados.cobrancas.concat(this.dados.movimentos).concat(this.dados.faturas)
    
    dadosConsolidados.forEach((item) => {
      if (item.isCredito) {
        saldoFuturo += item.valor
      } else {
        saldoFuturo -= item.valor
      }
    })

    return saldoFuturo
  }
}
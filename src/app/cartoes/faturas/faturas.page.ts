import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartaoService } from 'src/app/services/cartao.service';
import { Fatura } from 'src/app/models/fatura.model';
import { Cartao } from 'src/app/models/cartao.model';
import { ToastUtils } from 'src/app/utils/toast.utils';
import { ModalController } from '@ionic/angular';
import { InserirFaturaComponent } from './inserir-fatura/inserir-fatura.component';
import { FaturaService } from 'src/app/services/fatura.service';
import { ListaMovimentosComponent } from 'src/app/shared/lista-movimentos/lista-movimentos.component';
import { Movimento } from 'src/app/models/movimento.model';
import { PagarFaturaComponent } from './pagar-fatura/pagar-fatura.component';

@Component({
  selector: 'app-faturas',
  templateUrl: './faturas.page.html'
})
export class FaturasPage implements OnInit {

  faturas: Fatura[] = []
  faturasFiltradas: Fatura[] = []

  headerName: string = 'Faturas'
  saldoRestantePercentual: number = 0.0
  saldoRestante: number = 0.0
  firstLoading: boolean = true

  constructor(private activatedRoute: ActivatedRoute, private cartaoService: CartaoService, private faturaService: FaturaService, private toast: ToastUtils, private modalController: ModalController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    let cartaoId: number = this.activatedRoute.snapshot.params['id']

    this.cartaoService.getFaturas(cartaoId).subscribe((dados: Fatura[]) => {
      this.faturas = dados
      this.faturasFiltradas = this.firstLoading ? dados : this.faturasFiltradas

      if (this.hasFaturas()) {
        this.headerName = dados[0].cartao.nome
        this.saldoRestantePercentual = this.calculaPercentualSaldoRestante(dados[0].cartao, dados)
        this.saldoRestante = this.calculaSaldoRestante(dados[0].cartao, dados)
      }

      if (event !== null) {
        event.target.complete()
      }

      this.firstLoading = false
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  showSaldoRestante(): void {
    this.toast.showToast(`Saldo restante: ${this.saldoRestante.toFixed(2)}`)
  }

  /**
   * Evento responsável por aplicar o filtro escolhido pelo usuário
   * @param event 
   */
  onFiltroChange(event: any): void {
    let filtro: string = event.detail.value

    switch (filtro) {
      case 'nao-fechado':
        this.faturasFiltradas = this.faturas.filter((f: Fatura) => f.status === 'NAO_FECHADA')
        break
      case 'a-pagar':
        this.faturasFiltradas = this.faturas.filter((f: Fatura) => f.status === 'PENDENTE' || f.status === 'PAGO_PARCIAL')
        break
      case 'pago':
        this.faturasFiltradas = this.faturas.filter((f: Fatura) => f.status === 'PAGO')
    }
  }

  private calculaPercentualSaldoRestante(cartao: Cartao, faturas: Fatura[]): number {
    let limiteRestante: number = cartao.limite
    faturas.forEach((f: Fatura) => limiteRestante -= (f.valor - f.valorPago))

    return limiteRestante / cartao.limite
  }

  private calculaSaldoRestante(cartao: Cartao, faturas: Fatura[]): number {
    let limiteRestante: number = cartao.limite
    faturas.forEach((f: Fatura) => limiteRestante -= (f.valor - f.valorPago))

    return limiteRestante
  }

  hasFaturas(): boolean {
    return this.faturas.length > 0
  }

  showInserirFaturaModal(): void {
    this.modalController.create({
      component: InserirFaturaComponent,
      componentProps: {
        'cartaoid': this.activatedRoute.snapshot.params['id']
      }
    }).then((modal) => {
      modal.present()
      modal.onDidDismiss().then((modal) => {
        if (modal.data !== null) {
          this.faturas.push(modal.data)
        }
      })
    })
  }

  showMovimentosModal(fatura: Fatura): void {
    this.faturaService.getMovimentos(fatura.id).subscribe((dados: Movimento[]) => {
      this.modalController.create({
        component: ListaMovimentosComponent,
        componentProps: {
          'movimentos': dados,
          'modal': true,
          'emptyMovimentosMessage': 'Não há movimentos nesta fatura'
        }
      }).then((modal) => modal.present())
    })
  }

  abrirFatura(fatura: Fatura): void {
    this.faturaService.open(fatura.id).subscribe(() => {
      fatura.status = 'NAO_FECHADA'
      this.toast.showToast(`Fatura ${fatura.referencia} aberta`)
    })
  }

  fecharFatura(fatura: Fatura): void {
    this.faturaService.close(fatura.id).subscribe(() => {
      fatura.status = 'PENDENTE'
      this.toast.showToast(`Fatura ${fatura.referencia} fechada`)
    })
  }

  pagarFatura(fatura: Fatura): void {
    this.modalController.create({
      component: PagarFaturaComponent,
      componentProps: {
        'fatura': fatura
      }
    }).then((modal) => modal.present())
  }
}

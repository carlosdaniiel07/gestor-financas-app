import { Component, OnInit } from '@angular/core';
import { InvestimentoService } from '../services/investimento.service';
import { Investimento } from '../models/investimento.model';
import { ModalController, AlertController } from '@ionic/angular';
import { Corretora } from '../models/corretora.model';
import { ModalidadeInvestimento } from '../models/modalidade-investimento.model';
import { CorretoraService } from '../services/corretora.service';
import { InserirInvestimentoComponent } from './inserir-investimento/inserir-investimento.component';
import { LoadingUtils } from '../utils/loading.utils';
import { ModalidadeInvestimentoService } from '../services/modalidade-investimento.service';
import { InserirItemComponent } from './inserir-item/inserir-item.component';
import { ToastUtils } from '../utils/toast.utils';
import { DateUtils } from '../utils/date.utils'

@Component({
  selector: 'app-investimentos',
  templateUrl: './investimentos.page.html'
})
export class InvestimentosPage implements OnInit {

  investimentos: Investimento[] = []
  investimentosVisiveis: Investimento[] = []

  showFiltros: boolean = false
  showSomentePosicaoAtual: boolean = false

  private modalidadesInvestimento: ModalidadeInvestimento[]
  private corretoras: Corretora[]

  constructor(private investimentoService: InvestimentoService, private modalController: ModalController, private corretoraService: CorretoraService, private modalidadeService: ModalidadeInvestimentoService, private loading: LoadingUtils, private alertController: AlertController, private toast: ToastUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.showFiltros = false
    this.showSomentePosicaoAtual = false

    this.loadData()
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  loadData(event: any = null): void {
    this.investimentoService.getAll().subscribe((dados: Investimento[]) => {
      this.investimentos = dados
      this.investimentosVisiveis = dados
      this.showFiltros = dados.length > 0
    })

    this.corretoraService.getAll().subscribe((dados: Corretora[]) => this.corretoras = dados)
    
    this.modalidadeService.getAll().subscribe((dados: ModalidadeInvestimento[]) => {
      this.modalidadesInvestimento = dados
    
      if (event !== null) {
        event.target.complete()
      }
    })
  }

  showInserirInvestimentoModal(): void {
    this.modalController.create({
      component: InserirInvestimentoComponent,
      componentProps: {
        'modalidadesInvestimento': this.modalidadesInvestimento,
        'corretoras': this.corretoras
      }
    }).then((modal) => modal.present())
  }

  showAplicacaoModal(investimento: Investimento): void {
    this.modalController.create({
      component: InserirItemComponent,
      componentProps: {
        'investimento': investimento,
        'isAplicacao': true
      }
    }).then((modal) => modal.present())
  }

  showResgateModal(investimento: Investimento): void {
    this.modalController.create({
      component: InserirItemComponent,
      componentProps: {
        'investimento': investimento,
        'isAplicacao': false
      }
    }).then((modal) => modal.present())
  }

  atualizarValorAtual(investimento: Investimento): void {
    this.alertController.create({
      header: 'Atualizar valor atual',
      inputs: [
        { name: 'novoValor', id: 'novo-valor', type: 'number', value: investimento.valorAtual, placeholder: 'Novo valor' }
      ],
      buttons: [
        { text: 'Cancelar' },
        { text: 'Confirmar', handler: (inputData) =>  this.atualizaValor(investimento, inputData.novoValor)}
      ]
    }).then((alert) => alert.present())
  }

  private atualizaValor(investimento: Investimento, novoValor: number): void {
    if(novoValor.toString() !== "") {
      let newObj = Object.assign({}, investimento)
      newObj.valorAtual = novoValor

      this.investimentoService.atualiza(newObj).subscribe(() => {
        this.toast.showToast('Investimento atualizado')
        investimento.valorAtual = novoValor
      })
    } else {
      this.toast.showErrorToast('O novo valor precisa ser preenchido')
    }
  }

  onFiltroChanges(event: any): void {
    this.showSomentePosicaoAtual = event.detail.checked
    
    if (this.showSomentePosicaoAtual) {
      this.investimentosVisiveis = this.investimentosVisiveis.filter((i: Investimento) => i.valorAtual > 0)
    } else {
      this.investimentosVisiveis = this.investimentos
    }
  }

  showIndicadoresEconomicos(): void {
    let message: string = ''

    this.loading.showLoading('Recuperando dados API externa..')

    this.investimentoService.getIndicadoresEconomicos().subscribe((data: any) => {
      let results = data.results

      this.loading.dismissLoading()

      let usd = results.currencies.USD
      let btc = results.currencies.BTC
      let ibov = results.stocks.IBOVESPA
      let nasdaq = results.stocks.NASDAQ
      let taxes = results.taxes[0]

      message += `<strong>USD</strong>: ${usd.buy.toFixed(3)} (${usd.variation.toFixed(3)}%) <br/><br/>`
      message += `<strong>BTC</strong>: ${btc.buy.toFixed(3)} (${usd.variation.toFixed(3)}%) <br/><br/>`
      message += `<strong>IBOV</strong>: ${ibov.points.toFixed(2)} (${ibov.variation.toFixed(3)}%) <br/><br/>`
      message += `<strong>NASDAQ</strong>: ${nasdaq.points.toFixed(2)} (${nasdaq.variation.toFixed(3)}%) <br/><br/>`
      message += `<strong>SELIC</strong>: ${taxes.selic.toFixed(2)}`

      this.alertController.create({
        header: 'Indicadores',
        message: message,
        buttons: [
          'Ok'
        ]
      }).then((alert) => alert.present())
    })
  }
}

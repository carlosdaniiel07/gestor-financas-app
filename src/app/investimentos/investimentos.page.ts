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
}

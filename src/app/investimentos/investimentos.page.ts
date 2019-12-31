import { Component, OnInit } from '@angular/core';
import { InvestimentoService } from '../services/investimento.service';
import { Investimento } from '../models/investimento.model';
import { ModalController } from '@ionic/angular';
import { Corretora } from '../models/corretora.model';
import { ModalidadeInvestimento } from '../models/modalidade-investimento.model';
import { CorretoraService } from '../services/corretora.service';
import { InserirInvestimentoComponent } from './inserir-investimento/inserir-investimento.component';
import { LoadingUtils } from '../utils/loading.utils';
import { ModalidadeInvestimentoService } from '../services/modalidade-investimento.service';

@Component({
  selector: 'app-investimentos',
  templateUrl: './investimentos.page.html'
})
export class InvestimentosPage implements OnInit {

  investimentos: Investimento[] = []

  private modalidadesInvestimento: ModalidadeInvestimento[]
  private corretoras: Corretora[]

  constructor(private investimentoService: InvestimentoService, private modalController: ModalController, private corretoraService: CorretoraService, private modalidadeService: ModalidadeInvestimentoService, private loading: LoadingUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  loadData(event: any = null): void {
    this.investimentoService.getAll().subscribe((dados: Investimento[]) => this.investimentos = dados)
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
}

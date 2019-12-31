import { Component, OnInit } from '@angular/core';
import { InvestimentoService } from '../services/investimento.service';
import { Investimento } from '../models/investimento.model';
import { ModalController } from '@ionic/angular';
import { Corretora } from '../models/corretora.model';
import { ModalidadeInvestimento } from '../models/modalidade-investimento.model';
import { CorretoraService } from '../services/corretora.service';
import { InserirInvestimentoComponent } from './inserir-investimento/inserir-investimento.component';
import { LoadingUtils } from '../utils/loading.utils';

@Component({
  selector: 'app-investimentos',
  templateUrl: './investimentos.page.html'
})
export class InvestimentosPage implements OnInit {

  investimentos: Investimento[] = []

  constructor(private investimentoService: InvestimentoService, private modalController: ModalController, private corretoraService: CorretoraService, private loading: LoadingUtils) { }

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

      if (event !== null) {
        event.target.complete()
      }
    })
  }

  showInserirInvestimentoModal(): void {
    let modalidesInvestimento: ModalidadeInvestimento[] = [
      {
        id: 500,
        ativo: true,
        nome: 'CDB',
        tipo: 'RENDA_FIXA'
      }
    ]

    this.corretoraService.getAll().subscribe((dados: Corretora[]) => {
      this.modalController.create({
        component: InserirInvestimentoComponent,
        componentProps: {
          'modalidadesInvestimento': modalidesInvestimento,
          'corretoras': dados
        }
      }).then((modal) => modal.present())
    })
  }
}

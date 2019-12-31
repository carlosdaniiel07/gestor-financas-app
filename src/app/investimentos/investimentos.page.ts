import { Component, OnInit } from '@angular/core';
import { InvestimentoService } from '../services/investimento.service';
import { Investimento } from '../models/investimento.model';

@Component({
  selector: 'app-investimentos',
  templateUrl: './investimentos.page.html'
})
export class InvestimentosPage implements OnInit {

  investimentos: Investimento[] = []

  constructor(private investimentoService: InvestimentoService) { }

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
}

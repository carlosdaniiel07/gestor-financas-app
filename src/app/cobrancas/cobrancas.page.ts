import { Component, OnInit } from '@angular/core';
import { Cobranca } from '../models/cobranca.model';
import { CobrancaService } from '../services/cobranca.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cobrancas',
  templateUrl: './cobrancas.page.html'
})
export class CobrancasPage implements OnInit {

  cobrancas: Cobranca[] = []
  cobrancasFiltradas: Cobranca[] = []

  constructor(private cobrancaService: CobrancaService, private navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    this.cobrancaService.getAll().subscribe((dados: Cobranca[]) => {
      this.cobrancas = dados
      this.cobrancasFiltradas = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  onFiltroChange(event: any): void {
    let valor: string = event.detail.value

    switch(valor) {
      case 'pendente':
        this.cobrancasFiltradas = this.cobrancas.filter((c: Cobranca) => c.status === 'PENDENTE' || c.status === 'PAGO_PARCIAL')
        break
      case 'agendado':
        this.cobrancasFiltradas = this.cobrancas.filter((c: Cobranca) => c.status === 'AGENDADO')
        break
      case 'pago':
        this.cobrancasFiltradas = this.cobrancas.filter((c: Cobranca) => c.status === 'PAGO')
        break
      default: ''
    }
  }

  detalhes(cobranca: Cobranca): void {
    this.navController.navigateForward(`/cobrancas/detalhes/${cobranca.id}`)
  }

  editar(cobranca: Cobranca): void {
    this.navController.navigateForward(`/cobrancas/editar/${cobranca.id}`)
  }

  remover(cobranca: Cobranca): void {
    this.navController.navigateForward(`/cobrancas/remover/${cobranca.id}`)
  }

  showOperacoesModal(cobranca: Cobranca): void {
    
  }

  pagar(cobranca: Cobranca): void {
    this.navController.navigateForward(`/cobrancas/pagar/${cobranca.id}`)
  }
}

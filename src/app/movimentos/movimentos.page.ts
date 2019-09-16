import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../services/movimento.service';
import { Movimento } from '../models/movimento.model';

@Component({
  selector: 'app-movimentos',
  templateUrl: './movimentos.page.html'
})
export class MovimentosPage implements OnInit {

  movimentos: Movimento[] = []
  movimentosFiltrados: Movimento[] = []

  constructor(private movimentoService: MovimentoService) {}

  ngOnInit() {
  }

  ionViewWillEnter () {
    this.loadData()
  }

  loadData(event: any = null): void {
    this.movimentoService.getAll().subscribe((dados: Movimento[]) => {
      this.movimentos = dados
      this.movimentosFiltrados = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  onSearch(event: any): void {
    let valor: string = event.detail.value
    
    if(valor.trim().length === 0){
      this.resetFiltro()
    } else {
      this.movimentosFiltrados = this.movimentos.filter((m: Movimento) => 
        m.descricao.toLocaleLowerCase().includes(valor.toLocaleLowerCase()) || m.valor.toString() === valor || m.dataContabilizacao === valor
      )
    }
  }

  resetFiltro(): void {
    this.movimentosFiltrados = this.movimentos
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  loadMoreData(event: any): void {
    // setTimeout(() => {
    //   event.target.complete()
    //   console.log('Carregando finalizou!');
    // }, 3000)
  }
}

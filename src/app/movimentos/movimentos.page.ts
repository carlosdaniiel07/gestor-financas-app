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
 
  private paginaAtual: number = 0
  isLoading: boolean = true

  constructor(private movimentoService: MovimentoService) {}

  ngOnInit() {
  }

  ionViewWillEnter () {
    this.paginaAtual = 0
    this.movimentos = []
    this.movimentosFiltrados = []

    this.loadData(false)
  }

  loadData(concatData: boolean, event: any = null): void {
    this.isLoading = true

    this.movimentoService.getAll(this.paginaAtual).subscribe((dados: Movimento[]) => {
      
      if(concatData) {
        this.movimentos = this.movimentos.concat(dados)
        this.movimentosFiltrados = this.movimentos
      } else {
        this.movimentos = dados
        this.movimentosFiltrados = dados
      }

      this.isLoading = false

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
    this.loadData(false, event)
  }

  hasMovimentos(): boolean {
    return this.movimentos.length > 0
  }

  loadMoreData(event: any): void {
    // setTimeout(() => {
    //   event.target.complete()
    //   console.log('Carregando finalizou!');
    // }, 3000)
  }

  carregarMais(): void {
    this.paginaAtual += 1
    this.loadData(true)
  }
}

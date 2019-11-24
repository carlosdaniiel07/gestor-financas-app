import { Component, OnInit } from '@angular/core';
import { MovimentoService } from '../services/movimento.service';
import { Movimento } from '../models/movimento.model';
import { DateUtils } from '../utils/date.utils';
import { ToastUtils } from '../utils/toast.utils';

@Component({
  selector: 'app-movimentos',
  templateUrl: './movimentos.page.html'
})
export class MovimentosPage implements OnInit {

  movimentos: Movimento[] = []
  movimentosFiltrados: Movimento[] = []
  
  isLoading: boolean = true
  isFiltroRapidoAtivo: boolean = false

  private paginaAtual: number = 0

  constructor(private movimentoService: MovimentoService, private toast: ToastUtils) {}

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
      this.isFiltroRapidoAtivo = false

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

  /**
   * Filtra os movimentos bancários por período (mês passado, mês atual e próximo mês)
   * @param acao mesPassado, esteMes, proximoMes 
   */
  filtraPorPeriodo(acao: string): void {
    let range: {month: number, minDate: string, maxDate: string}
    let year = DateUtils.getYear()

    if (acao === 'mesPassado') {
      range = DateUtils.getMonthRange(DateUtils.getMomentMonth() - 1, year)
      this.toast.showToast('Exibindo os movimentos bancários do mês passado..')
    } else if (acao === 'esteMes') {
      range = DateUtils.getMonthRange(DateUtils.getMomentMonth(), year)
      this.toast.showToast('Exibindo os movimentos bancários deste mês..')
    } else {
      range = DateUtils.getMonthRange(DateUtils.getMomentMonth() + 1, year)
      this.toast.showToast('Exibindo os movimentos bancários do mês seguinte..')
    }

    this.isLoading = true
    
    this.movimentoService.getAllByPeriodo(range.minDate, range.maxDate).subscribe((dados: Movimento[]) => {
      this.movimentos = dados
      this.movimentosFiltrados = this.movimentos
      this.isLoading = false
      this.isFiltroRapidoAtivo = true
    })
  }

  limpaFiltroRapido(): void {
    this.isFiltroRapidoAtivo = false
    this.loadData(false)
  }
}

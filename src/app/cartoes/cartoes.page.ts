import { Component, OnInit } from '@angular/core';
import { CartaoService } from '../services/cartao.service';
import { Cartao } from '../models/cartao.model';
import { NavController } from '@ionic/angular';
import { ToastUtils } from '../utils/toast.utils';

@Component({
  selector: 'app-cartoes',
  templateUrl: './cartoes.page.html'
})
export class CartoesPage implements OnInit {

  cartoes: Cartao[] = []

  constructor(private cartaoService: CartaoService, private navController: NavController, private toast: ToastUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    this.cartaoService.getAll().subscribe((dados: Cartao[]) => {
      this.cartoes = dados
      
      if(event !== null){
        event.target.complete()
      }
    })
  }

  editar(cartao: Cartao): void {
    this.navController.navigateForward(`/cartoes/editar/${cartao.id}`)
  }

  remover(cartao: Cartao): void {
    this.cartaoService.delete(cartao.id).subscribe(() => this.cartoes.splice(this.cartoes.indexOf(cartao), 1))
  }

  showFaturas(cartao: Cartao): void {
    this.navController.navigateForward(`/cartoes/detalhes/${cartao.id}/faturas`)
  }

  showMovimentosModal(cartao: Cartao): void {
    this.toast.showToast('Em desenvolvimento..')
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }
}

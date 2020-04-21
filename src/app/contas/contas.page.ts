import { Component, OnInit } from '@angular/core';
import { ContaService } from '../services/conta.service';
import { Conta } from '../models/conta.model';
import { NavController, ModalController } from '@ionic/angular';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';
import { Movimento } from '../models/movimento.model';
import { LoadingUtils } from '../utils/loading.utils';
import { DetalhesSaldoComponent } from './detalhes-saldo/detalhes-saldo.component';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html'
})
export class ContasPage implements OnInit {

  contas: Conta[] = []

  constructor(private contaService: ContaService, private navController: NavController, private modalController: ModalController, private loading: LoadingUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }
  
  private loadData(event: any = null): void {
    this.contaService.getAll().subscribe((dados: Conta[]) => {
      this.contas = dados
      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  editar(conta: Conta): void {
    this.navController.navigateForward(`contas/editar/${conta.id}`)
  }

  remover(conta: Conta): void {
    this.contaService.delete(conta.id).subscribe(() => this.contas.splice(this.contas.indexOf(conta), 1))
  }

  showMovimentosModal(conta: Conta): void {
    this.loading.showLoading('Carregando..')

    this.contaService.getMovimentos(conta.id).subscribe((dados: Movimento[]) => {
      this.loading.dismissLoading()

      this.modalController.create({
        component: ListaMovimentosComponent,
        componentProps: {
          'movimentos': dados,
          'modal': true,
          'header': ''
        }
      }).then((modal) => modal.present())
    })
  }

  showDetalhesSaldo(): void {
    this.modalController.create({
      component: DetalhesSaldoComponent
    }).then((modal) => modal.present())
  }
}

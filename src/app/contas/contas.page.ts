import { Component, OnInit } from '@angular/core';
import { ContaService } from '../services/conta.service';
import { Conta } from '../models/conta.model';
import { NavController, ModalController } from '@ionic/angular';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';
import { Movimento } from '../models/movimento.model';

@Component({
  selector: 'app-contas',
  templateUrl: './contas.page.html'
})
export class ContasPage implements OnInit {

  contas: Conta[] = []

  constructor(private contaService: ContaService, private navController: NavController, private modalController: ModalController) { }

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

  showMovimentosModal(conta: Conta): void {
    this.contaService.getMovimentos(conta.id).subscribe((dados: Movimento[]) => {
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
}

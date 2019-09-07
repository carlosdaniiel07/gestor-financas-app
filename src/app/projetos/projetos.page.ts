import { Component, OnInit } from '@angular/core';
import { ProjetoService } from '../services/projeto.service';
import { Projeto } from '../models/projeto.model';
import { ModalController, NavController } from '@ionic/angular';
import { Movimento } from '../models/movimento.model';
import { ListaMovimentosComponent } from '../shared/lista-movimentos/lista-movimentos.component';

@Component({
  selector: 'app-projetos',
  templateUrl: './projetos.page.html'
})
export class ProjetosPage implements OnInit {
  projetos: Projeto[] = []

  constructor(private projetoService: ProjetoService, private modalController: ModalController, private navController: NavController) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  detalhes(projeto: Projeto): void {
    this.navController.navigateForward(`/projetos/detalhes/${projeto.id}`)
  }

  editar(projeto: Projeto): void {
    this.navController.navigateForward(`/projetos/editar/${projeto.id}`)
  }

  remover(projeto: Projeto): void {
    this.projetoService.delete(projeto.id).subscribe(() => 
      this.projetos.splice(this.projetos.indexOf(projeto), 1
    ))
  }

  showMovimentosModal(projeto: Projeto): void {
    this.projetoService.getMovimentos(projeto.id).subscribe((dados: Movimento[]) => {
      this.modalController.create({
        component: ListaMovimentosComponent,
        componentProps: {
          'movimentos': dados,
          'modal': true,
          'emptyMovimentosMessage': 'Não há nenhum movimento neste projeto'
        }
      }).then((modal) => modal.present())
    })
  }

  private loadData(event: any = null): void {
    this.projetoService.getAll().subscribe((dados: Projeto[]) => {
      this.projetos = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }
}

import { Component, OnInit } from '@angular/core';
import { TipoContaService } from '../services/tipo-conta.service';
import { TipoConta } from '../models/tipo-conta.model';
import { ModalController } from '@ionic/angular';
import { InserirTipoContaComponent } from './inserir-tipo-conta/inserir-tipo-conta.component';
import { EditarTipoContaComponent } from './editar-tipo-conta/editar-tipo-conta.component';

@Component({
  selector: 'app-tipos-conta',
  templateUrl: './tipos-conta.page.html'
})
export class TiposContaPage implements OnInit {

  tiposConta: TipoConta[] = []

  constructor(private tipoContaService: TipoContaService, private modalController: ModalController) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(event: any = null): void {
    this.tipoContaService.getAll().subscribe((dados: TipoConta[]) => {
      this.tiposConta = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  showInserirTipoContaModal(): void {
    this.modalController.create({
      component: InserirTipoContaComponent
    }).then((modal) => modal.present())
  }

  showEditarTipoContaModal(tipoConta: TipoConta): void {
    this.modalController.create({
      component: EditarTipoContaComponent,
      componentProps: {
        'tipoConta': tipoConta
      }
    }).then((modal) => modal.present())
  }

  removerTipoConta(tipoConta: TipoConta): void {
    this.tipoContaService.delete(tipoConta.id).subscribe(() => this.tiposConta.splice(this.tiposConta.indexOf(tipoConta)))
  }
}

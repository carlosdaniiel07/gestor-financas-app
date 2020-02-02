import { Component, OnInit } from '@angular/core';
import { Corretora } from '../models/corretora.model';
import { CorretoraService } from '../services/corretora.service';
import { ModalController } from '@ionic/angular';
import { InserirCorretoraComponent } from './inserir-corretora/inserir-corretora.component';
import { ToastUtils } from '../utils/toast.utils';

@Component({
  selector: 'app-corretoras',
  templateUrl: './corretoras.page.html',
})
export class CorretorasPage implements OnInit {

  corretoras: Corretora[] = []

  constructor(private corretoraService: CorretoraService, private modalController: ModalController, private toast: ToastUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  loadData(event: any = null): void {
    this.corretoraService.getAll().subscribe((dados: Corretora[]) => {
      this.corretoras = dados

      if (event !== null) {
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  insere(): void {
    this.modalController.create({
      component: InserirCorretoraComponent
    }).then((modal) => modal.present())
  }

  remover(corretora: Corretora): void {
    this.corretoraService.remove(corretora.id).subscribe(() => {
      this.corretoras.splice(this.corretoras.indexOf(corretora), 1)
      this.toast.showToast(`Corretora ${corretora.nome} removida`)
    })
  }
}

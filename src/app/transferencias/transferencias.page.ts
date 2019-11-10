import { Component, OnInit } from '@angular/core';
import { Transferencia } from '../models/transferencia.model';
import { TransferenciaService } from '../services/transferencia.service';
import { ModalController } from '@ionic/angular';
import { InserirTransferenciaComponent } from './inserir-transferencia/inserir-transferencia.component';
import { ToastUtils } from '../utils/toast.utils';

@Component({
  selector: 'app-transferencias',
  templateUrl: './transferencias.page.html'
})
export class TransferenciasPage implements OnInit {

  transferencias: Transferencia[] = []

  constructor(private transferenciaService: TransferenciaService, private modalController: ModalController, private toast: ToastUtils) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.loadData()
  }

  private loadData(event: any = null): void {
    this.transferenciaService.getAll().subscribe((dados: Transferencia[]) => {
      this.transferencias = dados

      if(event !== null){
        event.target.complete()
      }
    })
  }

  doRefresh(event: any): void {
    this.loadData(event)
  }

  inserirTransferenciaModal(): void {
    this.modalController.create({
      component: InserirTransferenciaComponent
    }).then((modal) => modal.present())
  }

  editar(transferencia: Transferencia): void {

  }

  efetivar(transferencia: Transferencia): void {
    this.transferenciaService.efetiva(transferencia.id).subscribe(() => {
      transferencia.status = 'EFETIVADO'
      this.toast.showToast('Transferência efetivada')
    })
  }

  estornar(transferencia: Transferencia): void {
    this.transferenciaService.estorna(transferencia.id).subscribe(() => {
      transferencia.status = 'ESTORNADO'
      this.toast.showToast('Transferência estornada')
    })
  }
}

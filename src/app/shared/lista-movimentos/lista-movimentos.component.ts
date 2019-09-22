import { Component, OnInit, Input } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { Movimento } from 'src/app/models/movimento.model';
import { MovimentoService } from 'src/app/services/movimento.service';
import { ToastUtils } from 'src/app/utils/toast.utils';

@Component({
  selector: 'app-lista-movimentos',
  templateUrl: './lista-movimentos.component.html',
  styleUrls: ['./lista-movimentos.component.scss'],
})
export class ListaMovimentosComponent implements OnInit {

  @Input() modal: boolean = false
  @Input() movimentos: Movimento[] = []
  @Input() emptyMovimentosMessage: string = 'Não há movimentação nesta conta'

  constructor(private modalController: ModalController, private navController: NavController, private movimentoService: MovimentoService, private toast: ToastUtils) { }

  ngOnInit() { }

  closeModal(): void {
    if(this.modal){
      this.modalController.dismiss()
    }
  }
  
  hasMovimentos(): boolean {
    return this.movimentos.length !== 0
  }

  detalhes(movto: Movimento): void {
    this.navController.navigateForward(`/movimentos/detalhes/${movto.id}`)
  }

  editar(movto: Movimento): void {
    this.navController.navigateForward(`/movimentos/editar/${movto.id}`)
  }

  remover(movto: Movimento): void {
    this.movimentoService.delete(movto.id).subscribe(() => {
      this.movimentos.splice(this.movimentos.indexOf(movto), 1)
      this.toast.showToast('Movimento removido')
    })
  }
}
